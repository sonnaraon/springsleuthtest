/**
 * leaflet.AFS.Overlay.js
 *
 * 기상청 동네예보 픽셀맵 & 바람장 레이어 정의
 */

/**
 * Array.prototype.find polyfill
 */
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		value: function(predicate) {
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined')
			}

			var o = Object(this)

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function')
			}

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1]

			// 5. Let k be 0.
			var k = 0

			// 6. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				// d. If testResult is true, return kValue.
				var kValue = o[k]
				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue
				}
				// e. Increase k by 1.
				k++
			}

			// 7. Return undefined.
			return undefined
		},
		configurable: true,
		writable: true,
	})
}

;(function(factory, window) {
	// define an AMD module that relies on 'leaflet'
	if (typeof define === 'function' && define.amd) {
		define(['leaflet'], factory)

		// define a Common JS module that relies on 'leaflet'
	} else if (typeof exports === 'object') {
		module.exports = factory(require('leaflet'))
	} else {
		factory(L)
	}
})(function(L) {
	'use strict'

	/**
	 * L.OverlayLayer 정의
	 */
	L.OverlayLayer = L.GridLayer.extend({
		options: {
			data: null,
			zIndex: 5,
			updateWhenZooming: false,
		},
		_dataType: '',
		_findColor: null,
		_overlayMask: null,
		_colorScale: null,
		_colorIndexCanvas: null,
		_forecastSize: L.point(0, 0),

		initialize: function(options) {
			var data = options.data
			this._dataType = data.input.dataType
			this._colorScale = this._convertColorScale(data.result.color)
			this._findColor = this._setFindColor()
			this._overlayMask = this._setOverlayMask()
			options.data = this._convertData(data.result.rtnData)

			L.setOptions(this, options)
		},

		onAdd: function(map) {
			// Setting Forcast Size
			this._forecastSize = this._setForecastSize()

			if (map.options.displayColorIndex) {
				this._drawColorIndex()
			}

			// call parents onAdd
			L.GridLayer.prototype.onAdd.call(this, map)
		},

		getData: function() {
			return this.options.data
		},

		setData: function(data) {
			this._dataType = data.input.dataType
			this._colorScale = this._convertColorScale(data.result.color)
			this._findColor = this._setFindColor()
			this._overlayMask = this._setOverlayMask()
			this.options.data = this._convertData(data.result.rtnData)

			if (this._map.options.displayColorIndex) {
				this._drawColorIndex()
			}

			this.redraw()
		},

		createTile: function(coords) {
			var tile = L.DomUtil.create('canvas', 'leaflet-tile')
			var data = this.options.data
			if (!data) {
				return tile
			}

			var size = this.getTileSize()
			tile.width = size.x
			tile.height = size.y

			var dx = coords.x * size.x
			var dy = coords.y * size.y

			// 기준
			var zoom = this._map.getZoomScale(coords.z, 9)
			var leftTop = this._map.unproject(L.point(dx, dy), coords.z)
			var rightBottom = this._map.unproject(L.point(dx + size.x, dy + size.y), coords.z)
			var bounds = L.latLngBounds(leftTop, rightBottom).pad(0.08 * Math.sqrt(zoom))

			var ltc = LEAFLET_AFS_CONFIG.OVERLAY.COORDS[0]
			var origin = this._map.project(L.latLng(ltc.lat, ltc.lng), coords.z)
			var diff = L.point(dx, dy)
				.subtract(origin)
				.floor()

			// 픽셀 크기
			var ratio = (this._forecastSize.x / LEAFLET_AFS_CONFIG.OVERLAY.FIELD.x) * zoom

			var ctx = tile.getContext('2d')
			for (var i = 0; i < data.length; i++) {
				var d = data[i]
				if (bounds.contains(d.latlng)) {
					var p = d.point
						.subtract(L.point(1, 0))
						.multiplyBy(ratio)
						.subtract(diff)
					ctx.fillStyle = this._findColor(d.value)
					for (var j = 0; j < 4; j++) {
						// x: 더하기가 오른쪽으로 이동
						// y: 더하기가 아래로 이동
						ctx.fillRect(p.x + ratio * 0.5, p.y - ratio, ratio, ratio)
					}

					// ctx.fillStyle = '#333333'
					// ctx.font = '400 9px "Noto Sans KR", sans-serif'
					// var text = `${d.point.x},${d.point.y}`
					// ctx.fillText(text, p.x + ratio * 0.5, p.y - ratio * 0.75)
				}
			}

			return tile
		},

		// =========== private =============

		_setForecastSize: function() {
			var coords = LEAFLET_AFS_CONFIG.OVERLAY.COORDS
			var leftTop = this._map.project(L.latLng(coords[0].lat, coords[0].lng), 9)
			var rightBottom = this._map.project(
				L.latLng(coords[coords.length - 1].lat, coords[coords.length - 1].lng),
				9
			)
			return rightBottom.subtract(leftTop).ceil()
		},

		_drawColorIndex: function() {
			if (!this._colorIndexCanvas) {
				var map = this._map._container
				var canvas = map.nextElementSibling
				if (!canvas) {
					canvas = document.createElement('canvas')
					map.parentElement.appendChild(canvas)
				}
				canvas.width = 31
				canvas.height = map.style.height.replace('px', '')
				this._colorIndexCanvas = canvas
			}

			drawColorIndex(this._colorIndexCanvas, this._dataType, this._colorScale[0])
			return
		},

		_convertData: function(data) {
			var coords = LEAFLET_AFS_CONFIG.OVERLAY.COORDS
			var overlayMaskFunc = this._overlayMask
			var converted = []
			var size = LEAFLET_AFS_CONFIG.OVERLAY.FIELD
			coords.forEach(function(l) {
				var value = data[l.x - 1 + (size.y - l.y) * size.x]
				if (value !== -999 && overlayMaskFunc(l.x - 1, l.y - 1)) {
					converted.push({
						point: L.point(l.x, l.y),
						latlng: L.latLng(l.lat, l.lng),
						value,
					})
				}
			})
			return converted
		},

		_convertColorScale: function(color) {
			var styles = []
			var styles2 = []
			color.colorLvl.forEach(function(c, i) {
				styles.push({
					rgb: color.colorData[i],
					bound: Number(c),
				})
				styles2[Number(c)] = color.colorData[i]
			})
			return [styles, styles2]
		},

		_setFindColor: function() {
			var findColor = null
			switch (this._dataType) {
				case 'PTY':
				case 'SKY':
					var styles = this._colorScale[1]
					findColor = function(val) {
						return styles[val]
					}
					break
				case 'R06':
				case 'S06':
					var styles = this._colorScale[0]
					findColor = function(val) {
						if (val === 0) {
							return styles[0].rgb
						}
						var item = styles.find(function(s) {
							return s.bound > val
						})
						if (!item) {
							return styles[styles.length - 1].rgb
						}
						return item.rgb
					}
					break
				default:
					var styles = this._colorScale[0]
					findColor = function(val) {
						var item = styles.find(function(s) {
							return s.bound > val
						})
						if (!item) {
							return styles[styles.length - 1].rgb
						}
						return item.rgb
					}
			}
			return findColor
		},

		_setOverlayMask: function() {
			var overlayMask = null
			var mask = LEAFLET_AFS_CONFIG.OVERLAY.MASK
			switch (this._dataType) {
				case 'WAV':
					overlayMask = function(x, y) {
						var maskPt = mask[x][y].toString()
						return !maskPt.endsWith('1') && maskPt !== 0
					}
					break
				case 'PTY':
				case 'SKY':
					overlayMask = function() {
						return true
					}
					break
				default:
					overlayMask = function(x, y) {
						var maskPt = mask[x][y].toString()
						return maskPt.endsWith('1') && maskPt !== '81' && maskPt !== '91'
					}
			}
			return overlayMask
		},
	})

	L.overlayLayer = function(options) {
		return new L.OverlayLayer(options)
	}

	/**
	 * L.CanvasLayer 정의
	 * https://github.com/Sumbera/gLayers.Leaflet
	 */
	L.CanvasLayer = (L.Layer ? L.Layer : L.Class).extend({
		// -- initialized is called on prototype
		initialize: function(options) {
			this._map = null
			this._canvas = null
			this._frame = null
			this._delegate = null
			L.setOptions(this, options)
		},

		delegate: function(del) {
			this._delegate = del
			return this
		},

		needRedraw: function() {
			if (!this._frame) {
				this._frame = L.Util.requestAnimFrame(this.drawLayer, this)
			}
			return this
		},

		//-------------------------------------------------------------
		_onLayerDidResize: function(resizeEvent) {
			this._canvas.width = resizeEvent.newSize.x
			this._canvas.height = resizeEvent.newSize.y
		},
		//-------------------------------------------------------------
		_onLayerDidMove: function() {
			this._updateZoomAndCenter()

			var topLeft = this._map.containerPointToLayerPoint([0, 0])
			L.DomUtil.setPosition(this._canvas, topLeft)
			this.drawLayer()
		},
		//-------------------------------------------------------------
		getEvents: function() {
			var events = {
				resize: this._onLayerDidResize,
				moveend: this._onLayerDidMove,
				zoom: this._onZoom,
			}
			if (this._map.options.zoomAnimation && L.Browser.any3d) {
				events.zoomanim = this._onAnimZoom
			}

			return events
		},
		//-------------------------------------------------------------
		onAdd: function(map) {
			this._map = map
			this._canvas = L.DomUtil.create('canvas', 'leaflet-layer')
			this.tiles = {}

			var size = this._map.getSize()
			this._canvas.width = size.x
			this._canvas.height = size.y

			var animated = this._map.options.zoomAnimation && L.Browser.any3d
			L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'))

			this._updateZoomAndCenter()
			map._panes.overlayPane.appendChild(this._canvas)
			map.on(this.getEvents(), this)

			var del = this._delegate || this
			del.onLayerDidMount && del.onLayerDidMount() // -- callback
			this.needRedraw()

			var self = this
			setTimeout(function() {
				self._onLayerDidMove()
			}, 0)
		},

		//-------------------------------------------------------------
		onRemove: function(map) {
			var del = this._delegate || this
			del.onLayerWillUnmount && del.onLayerWillUnmount() // -- callback

			map.getPanes().overlayPane.removeChild(this._canvas)

			map.off(this.getEvents(), this)

			this._canvas = null
		},

		//------------------------------------------------------------
		addTo: function(map) {
			map.addLayer(this)
			return this
		},
		// --------------------------------------------------------------------------------
		LatLonToMercator: function(latlon) {
			return {
				x: (latlon.lng * 6378137 * Math.PI) / 180,
				y: Math.log(Math.tan(((90 + latlon.lat) * Math.PI) / 360)) * 6378137,
			}
		},

		//------------------------------------------------------------------------------
		drawLayer: function() {
			// -- todo make the viewInfo properties  flat objects.
			var size = this._map.getSize()
			var bounds = this._map.getBounds()
			var zoom = this._map.getZoom()

			var center = this.LatLonToMercator(this._map.getCenter())
			var corner = this.LatLonToMercator(this._map.containerPointToLatLng(size))

			var del = this._delegate || this
			del.onDrawLayer &&
				del.onDrawLayer({
					layer: this,
					canvas: this._canvas,
					bounds: bounds,
					size: size,
					zoom: zoom,
					center: center,
					corner: corner,
				})
			this._frame = null
		},

		//------------------------------------------------------------------------------
		_updateZoomAndCenter: function() {
			this._center = this._map.getCenter()
			this._zoom = this._map.getZoom()
		},

		_onAnimZoom: function(e) {
			this._updateTransform(e.center, e.zoom)
		},

		//Layer
		_onZoom: function() {
			this._updateTransform(this._map.getCenter(), this._map.getZoom())
		},

		_updateTransform: function(center, zoom) {
			var scale = this._map.getZoomScale(zoom, this._zoom),
				position = L.DomUtil.getPosition(this._canvas),
				viewHalf = this._map.getSize().multiplyBy(0.5),
				currentCenterPoint = this._map.project(this._center, zoom),
				destCenterPoint = this._map.project(center, zoom),
				centerOffset = destCenterPoint.subtract(currentCenterPoint),
				topLeftOffset = viewHalf
					.multiplyBy(-scale)
					.add(position)
					.add(viewHalf)
					.subtract(centerOffset)

			if (L.Browser.any3d) {
				L.DomUtil.setTransform(this._canvas, topLeftOffset, scale)
			} else {
				L.DomUtil.setPosition(this._canvas, topLeftOffset)
			}
		},
	})
	L.canvasLayer = function() {
		return new L.CanvasLayer()
	}

	/**
	 * LEAFLET_AFS_CONFIG.OVERLAY.COORDS 확장
	 * https://lodash.com/
	 */
	LEAFLET_AFS_CONFIG.OVERLAY.WIND_COORDS = _.clone(LEAFLET_AFS_CONFIG.OVERLAY.COORDS)
	LEAFLET_AFS_CONFIG.OVERLAY.WIND_COORDS.sort(function(a, b) {
		var d1 = a.y - b.y
		return d1 !== 0 ? d1 : a.x - b.x
	})

	/**
	 * L.WindLayer 정의
	 * https://github.com/danwild/leaflet-velocity
	 */
	L.WindLayer = (L.Layer ? L.Layer : L.Class).extend({
		options: {
			data: null,
			isOverlay: false,
		},
		_map: null,
		_canvasLayer: null,
		_windy: null,
		_context: null,
		_timer: 0,
		_colorScale: null,
		_colorIndexCanvas: null,
		_forecastSize: L.point(0, 0),

		initialize: function(options) {
			this._colorScale = this._convertColorScale(
				options.data.wsd.result.color,
				options.isOverlay
			)
			options.data = this._convertData(options.data)
			L.setOptions(this, options)
		},

		onAdd: function(map) {
			// Setting Forcast Size
			this._forecastSize = this._setForecastSize()

			// create canvas, add overlay control
			this._canvasLayer = L.canvasLayer().delegate(this)
			this._canvasLayer.addTo(map)
			this._map = map
		},

		onRemove: function(map) {
			this._destroyWind()
		},

		getData: function() {
			return this.options.data
		},

		setData: function(data, isOverlay) {
			this._colorScale = this._convertColorScale(data.wsd.result.color, isOverlay)
			this.options.data = this._convertData(data)
			this.options.isOverlay = isOverlay

			if (!isOverlay && this._map.options.displayColorIndex) {
				this._drawColorIndex()
			}

			if (!this.options.data) {
				this._clearWind()
				return
			}

			if (this._windy) {
				this._windy.setData(this.options.data, this._colorScale)
				this._clearAndRestart()
			}

			this.fire('load')
		},

		/*-------------- PRIVATE ---------------*/

		_setForecastSize: function() {
			var coords = LEAFLET_AFS_CONFIG.OVERLAY.COORDS
			var leftTop = this._map.project(L.latLng(coords[0].lat, coords[0].lng), 9)
			var rightBottom = this._map.project(
				L.latLng(coords[coords.length - 1].lat, coords[coords.length - 1].lng),
				9
			)
			return rightBottom.subtract(leftTop).ceil()
		},

		_drawColorIndex: function() {
			if (!this._colorIndexCanvas) {
				var map = this._map._container
				var canvas = map.nextElementSibling
				if (!canvas) {
					canvas = document.createElement('canvas')
					map.parentElement.appendChild(canvas)
				}
				canvas.width = 31
				canvas.height = map.style.height.replace('px', '')
				this._colorIndexCanvas = canvas
			}

			// canvas, dataType, colors
			drawColorIndex(this._colorIndexCanvas, 'WSD', this._colorScale)
		},

		_convertColorScale: function(color, isOverlay) {
			var self = this
			var styles = []
			color.colorLvl.forEach(function(c, i) {
				styles.push({
					rgb: isOverlay ? self._hexToGrayscale(color.colorData[i]) : color.colorData[i],
					bound: Number(c),
				})
			})
			return styles
		},

		_hexToGrayscale: function(hex) {
			return `rgb(255,255,255)`
		},

		_convertData: function(data) {
			var self = this

			if (data.vec.result.isExisted === 'false' || data.wsd.result.isExisted === 'false') {
				return null
			}

			var vec = data.vec.result.rtnData
			var wsd = data.wsd.result.rtnData

			var orig_coords = LEAFLET_AFS_CONFIG.OVERLAY.COORDS
			var coords = LEAFLET_AFS_CONFIG.OVERLAY.WIND_COORDS
			var leftTop = orig_coords[0],
				rightBottom = orig_coords[orig_coords.length - 1]
			var size = LEAFLET_AFS_CONFIG.OVERLAY.FIELD

			var windData = {
				header: {
					la1: leftTop.lat,
					la2: rightBottom.lat,
					lo1: leftTop.lng,
					lo2: rightBottom.lng,
					nx: size.x,
					ny: size.y,
				},
				comp: {
					u: [],
					v: [],
				},
			}

			coords.forEach(function(l) {
				var idx = l.x - 1 + (size.y - l.y) * size.x
				var wv = wsd[idx],
					wd = vec[idx],
					uv = [null, null]
				if (wv !== -999 && wd !== -999) {
					uv = self._componentize([wd, wv])
				}
				windData.comp.u.push(uv[0])
				windData.comp.v.push(uv[1])
			})

			return windData
		},

		_componentize: function(wind) {
			var φ = (wind[0] / 360) * 2 * Math.PI // meteorological wind direction in radians
			var m = wind[1] // wind velocity, m/s
			var u = -m * Math.sin(φ) // u component, zonal velocity
			var v = -m * Math.cos(φ) // v component, meridional velocity
			return [u, -v] // negate v because pixel space grows downwards
		},

		onDrawLayer: function(overlay, params) {
			var self = this

			if (!this._windy) {
				this._initWindy(this)
				return
			}

			if (!this.options.isOverlay && this._map.options.displayColorIndex) {
				this._drawColorIndex()
			}

			if (!this.options.data) {
				// initial, no Data
				return
			}

			if (this._timer) clearTimeout(self._timer)

			this._clearWind()
			this._timer = setTimeout(function() {
				self._startWindy()
			}, 300) // showing velocity is delayed
		},

		_startWindy: function() {
			var self = this

			var bounds = this._map.getBounds()
			var size = this._map.getSize()

			var zoom = this._map.getZoom()
			var ratio = this._forecastSize.x / LEAFLET_AFS_CONFIG.OVERLAY.FIELD.x
			var scale = this._map.getZoomScale(zoom, 9) * ratio
			var leftTop = this._map.getPixelBounds().min.divideBy(scale)

			this._windy.setTransform({
				ratio,
				scale,
				point: leftTop,
				project: function(lat, lng) {
					return self._map.project(L.latLng(lat, lng), 9)
				},
			})

			this._windy.start([[0, 0], [size.x, size.y]], size.x, size.y, [
				[bounds._southWest.lng, bounds._southWest.lat],
				[bounds._northEast.lng, bounds._northEast.lat],
			])
		},

		_initWindy: function(self) {
			// windy object, copy options
			var options = Object.assign({ canvas: self._canvasLayer._canvas }, self.options)
			options.colorScale = this._colorScale
			this._windy = new Windy(options)

			// prepare context global var, start drawing
			this._context = this._canvasLayer._canvas.getContext('2d')
			this._canvasLayer._canvas.classList.add('velocity-overlay')
			// this.onDrawLayer()

			this._map.on('dragstart', self._windy.stop)
			this._map.on('dragend', self._clearAndRestart)
			this._map.on('zoomstart', self._windy.stop)
			this._map.on('zoomend', self._clearAndRestart)
			this._map.on('resize', self._clearWind)
		},

		_clearAndRestart: function() {
			if (this._context) this._context.clearRect(0, 0, 3000, 3000)
			if (this._windy) this._startWindy()
		},

		_clearWind: function() {
			if (this._windy) this._windy.stop()
			if (this._context) this._context.clearRect(0, 0, 3000, 3000)
		},

		_destroyWind: function() {
			if (this._timer) clearTimeout(this._timer)
			if (this._windy) this._windy.stop()
			if (this._context) this._context.clearRect(0, 0, 3000, 3000)
			this._windy = null
			this._map.removeLayer(this._canvasLayer)
		},
	})
	L.windLayer = function(options) {
		return new L.WindLayer(options)
	}

	/**
	 * Global class for simulating the movement of particle through a 1km wind grid
	 *
	 * credit: All the credit for this work goes to: https://github.com/cambecc for creating the repo: https://github.com/cambecc/earth.
	 */
	var Windy = function Windy(params) {
		var VELOCITY_SCALE =
			(params.velocityScale || 0.3) * (Math.pow(window.devicePixelRatio, 1 / 3) || 1)
		// scale for wind velocity (completely arbitrary--this value looks nice)
		var MAX_PARTICLE_AGE = params.particleAge || 60 // max number of frames a particle is drawn before regeneration
		var PARTICLE_LINE_WIDTH = params.lineWidth || 1 // line width of a drawn particle
		var PARTICLE_LINE_WIDTH_SCALE = 1
		var PARTICLE_MULTIPLIER = params.particleMultiplier || 0.02 // particle count scalar (completely arbitrary--this values looks nice)
		var PARTICLE_MULTIPLIER_SCALE = 1
		var PARTICLE_REDUCTION = Math.pow(window.devicePixelRatio, 1 / 3) || 1.6 // multiply particle count for mobiles by this amount
		var FRAME_RATE = params.frameRate || 25,
			FRAME_TIME = 1000 / FRAME_RATE // desired frames per second
		var colorScale = params.colorScale

		var NULL_WIND_VECTOR = [NaN, NaN, null]

		var builder
		var grid
		var gridData = params.data
		var λ0, φ0, λ1, φ1, ni, nj
		var transform

		var setData = function(gd, cs) {
			gridData = gd
			colorScale = cs
		}

		var setTransform = function(t) {
			transform = t
		}

		// interpolation for vectors like wind (u,v,m)
		var interpolateVector = function(x, y, g00, g10, g01, g11) {
			var rx = 1 - x
			var ry = 1 - y
			var a = rx * ry,
				b = x * ry,
				c = rx * y,
				d = x * y
			var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d
			var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d
			return [u, v, Math.sqrt(u * u + v * v)]
		}

		var createWindBuilder = function(data) {
			var uData = data.comp.u,
				vData = data.comp.v,
				header = data.header
			return {
				header: header,
				data: function data(i) {
					return [uData[i], vData[i]]
				},
				interpolate: interpolateVector,
			}
		}

		var buildGrid = function(data, callback) {
			builder = createWindBuilder(data)
			var header = builder.header

			λ0 = header.lo1 // left-Top
			φ0 = header.la1 // the grid's origin (e.g., 0.0E, 90.0N)

			λ1 = header.lo2 // right-Bottom
			φ1 = header.la2 // the grid's origin (e.g., 0.0E, 90.0N)

			ni = header.nx
			nj = header.ny // number of grid points W-E and N-S (e.g., 144 x 73)

			PARTICLE_MULTIPLIER_SCALE = Math.sqrt(transform.scale / transform.ratio)
			PARTICLE_LINE_WIDTH_SCALE =
				transform.scale > 20 ? PARTICLE_LINE_WIDTH * 1.5 : PARTICLE_LINE_WIDTH

			transform.point = transform.point
				.subtract(transform.project(φ0, λ0).divideBy(transform.ratio))
				.floor()

			// Scan mode 0 assumed. Longitude increases from λ0, and latitude decreases from φ0.
			// http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
			grid = []
			var p = 0

			for (var j = 0; j < nj; j++) {
				var row = []
				for (var i = 0; i < ni; i++, p++) {
					row[i] = builder.data(p)
				}
				row.push(row[0])
				grid[j] = row
			}

			callback({
				interpolate: interpolate,
			})
		}

		/**
		 * Get interpolated grid value from (x, y) position
		 * @param x {Float} X-axis point
		 * @param y {Float} Y-axis point
		 * @returns {Object}
		 */
		var interpolate = function(x, y) {
			if (!grid) return null

			var i = x / transform.scale + transform.point.x
			var j = y / transform.scale + transform.point.y

			var fi = Math.floor(i),
				ci = fi + 1
			var fj = Math.floor(j),
				cj = fj + 1

			var row
			if ((row = grid[fj])) {
				var g00 = row[fi]
				var g10 = row[ci]
				if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
					var g01 = row[fi]
					var g11 = row[ci]
					if (isValue(g01) && isValue(g11)) {
						// All four points found, so interpolate the value.
						return builder.interpolate(i - fi, j - fj, g00, g10, g01, g11)
					}
				}
			}
			return null
		}

		/**
		 * @returns {Boolean} true if the specified value is not null and not undefined.
		 */
		var isValue = function(x) {
			return x !== null && x !== undefined
		}

		/**
		 * @returns {Boolean} true if agent is probably a mobile device. Don't really care if this is accurate.
		 */
		var isMobile = function() {
			return /android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(
				navigator.userAgent
			)
		}

		var createField = function(columns, bounds, callback) {
			/**
			 * @returns {Array} wind vector [u, v, magnitude] at the point (x, y), or [NaN, NaN, null] if wind
			 *          is undefined at that point.
			 */
			function field(x, y) {
				var column = columns[Math.round(x)]
				return (column && column[Math.round(y)]) || NULL_WIND_VECTOR
			}

			// Frees the massive "columns" array for GC. Without this, the array is leaked (in Chrome) each time a new
			// field is interpolated because the field closure's context is leaked, for reasons that defy explanation.
			field.release = function() {
				columns = []
			}

			field.randomize = function(o) {
				// UNDONE: this method is terrible
				var x, y
				var safetyNet = 0
				do {
					x = Math.round(Math.floor(Math.random() * bounds.width) + bounds.x)
					y = Math.round(Math.floor(Math.random() * bounds.height) + bounds.y)
				} while (field(x, y)[2] === null && safetyNet++ < 30)
				o.x = x
				o.y = y
				return o
			}

			callback(bounds, field)
		}

		var buildBounds = function(bounds, width, height) {
			var upperLeft = bounds[0]
			var lowerRight = bounds[1]
			var x = Math.round(upperLeft[0]) //Math.max(Math.floor(upperLeft[0], 0), 0);
			var y = Math.max(Math.floor(upperLeft[1], 0), 0)
			var xMax = Math.min(Math.ceil(lowerRight[0], width), width - 1)
			var yMax = Math.min(Math.ceil(lowerRight[1], height), height - 1)
			return { x: x, y: y, xMax: width, yMax: yMax, width: width, height: height }
		}

		var deg2rad = function(deg) {
			return (deg / 180) * Math.PI
		}

		var rad2deg = function(ang) {
			return ang / (Math.PI / 180.0)
		}

		var invert = function(x, y, windy) {
			var mapLonDelta = windy.east - windy.west
			var worldMapRadius = ((windy.width / rad2deg(mapLonDelta)) * 360) / (2 * Math.PI)
			var mapOffsetY =
				(worldMapRadius / 2) *
				Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south)))
			var equatorY = windy.height + mapOffsetY
			var a = (equatorY - y) / worldMapRadius

			var lat = (180 / Math.PI) * (2 * Math.atan(Math.exp(a)) - Math.PI / 2)
			var lon = rad2deg(windy.west) + (x / windy.width) * rad2deg(mapLonDelta)
			return [lon, lat]
		}

		var interpolateField = function(grid, bounds, extent, callback) {
			var projection = {}
			var mapArea = (extent.south - extent.north) * (extent.west - extent.east)

			var columns = []
			var x = bounds.x

			function interpolateColumn(x) {
				var column = []
				for (var y = bounds.y; y <= bounds.yMax; y += 2) {
					var coord = invert(x, y, extent)
					if (coord) {
						var λ = coord[0],
							φ = coord[1]
						if (isFinite(λ)) {
							var wind = grid.interpolate(x, y)
							if (wind) {
								wind[0] *= VELOCITY_SCALE
								wind[1] *= VELOCITY_SCALE
								column[y + 1] = column[y] = wind
							} else {
								column[y + 1] = column[y] = [0, 0, 0]
							}
						}
					}
				}
				columns[x + 1] = columns[x] = column
			}

			;(function batchInterpolate() {
				var start = Date.now()
				while (x < bounds.width) {
					interpolateColumn(x)
					x += 2
					if (Date.now() - start > 1000) {
						//MAX_TASK_TIME) {
						setTimeout(batchInterpolate, 25)
						return
					}
				}
				createField(columns, bounds, callback)
			})()
		}

		var animationLoop
		var animate = function(bounds, field) {
			function windIntensityColorScale() {
				var bounds = colorScale.map(function(c) {
					return c.bound
				})
				var len = bounds.length
				var colors = colorScale.map(function(c) {
					return c.rgb
				})
				colors.indexFor = function(m) {
					for (var i = 0; i < len; i++) {
						if (m <= bounds[i]) {
							return i
						}
					}
					return len - 1
				}
				return colors
			}

			var colorStyles = windIntensityColorScale()
			var buckets = colorStyles.map(function() {
				return []
			})

			var particleCount = Math.round(
				(bounds.width * bounds.height * PARTICLE_MULTIPLIER) / PARTICLE_MULTIPLIER_SCALE
			)
			if (isMobile()) {
				particleCount *= PARTICLE_REDUCTION
			}

			var fadeFillStyle = 'rgba(0, 0, 0, 0.97)'

			var particles = []
			for (var i = 0; i < particleCount; i++) {
				particles.push(
					field.randomize({ age: Math.floor(Math.random() * MAX_PARTICLE_AGE) + 0 })
				)
			}

			function evolve() {
				buckets.forEach(function(bucket) {
					bucket.length = 0
				})
				particles.forEach(function(particle) {
					if (particle.age > MAX_PARTICLE_AGE) {
						field.randomize(particle).age = 0
					}
					var x = particle.x
					var y = particle.y
					var v = field(x, y) // vector at current position
					var m = v[2]
					if (m === null) {
						particle.age = MAX_PARTICLE_AGE // particle has escaped the grid, never to return...
					} else {
						var xt = x + v[0]
						var yt = y + v[1]
						if (field(xt, yt)[2] !== null) {
							// Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
							particle.xt = xt
							particle.yt = yt
							buckets[colorStyles.indexFor(m)].push(particle)
						} else {
							// Particle isn't visible, but it still moves through the field.
							particle.x = xt
							particle.y = yt
						}
					}
					particle.age += 1
				})
			}

			var g = params.canvas.getContext('2d')
			g.lineWidth = PARTICLE_LINE_WIDTH_SCALE
			g.fillStyle = fadeFillStyle
			g.globalAlpha = 0.6

			function draw() {
				// Fade existing particle trails.
				var prev = g.globalCompositeOperation
				g.globalCompositeOperation = 'destination-in'
				g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height)
				g.globalCompositeOperation = prev
				g.globalAlpha = 0.9

				// Draw new particle trails.
				buckets.forEach(function(bucket, i) {
					if (bucket.length > 0) {
						g.beginPath()
						g.strokeStyle = colorStyles[i]
						bucket.forEach(function(particle) {
							g.moveTo(particle.x, particle.y)
							g.lineTo(particle.xt, particle.yt)
							particle.x = particle.xt
							particle.y = particle.yt
						})
						g.stroke()
					}
				})
			}

			var then = Date.now()
			;(function frame() {
				animationLoop = requestAnimationFrame(frame)
				var now = Date.now()
				var delta = now - then
				if (delta > FRAME_TIME) {
					then = now - (delta % FRAME_TIME)
					evolve()
					draw()
				}
			})()
		}

		var start = function(bounds, width, height, extent) {
			var mapBounds = {
				south: deg2rad(extent[0][1]),
				north: deg2rad(extent[1][1]),
				east: deg2rad(extent[1][0]),
				west: deg2rad(extent[0][0]),
				width: width,
				height: height,
			}

			stop()

			// build grid
			buildGrid(gridData, function(grid) {
				// interpolateField
				interpolateField(grid, buildBounds(bounds, width, height), mapBounds, function(
					bounds,
					field
				) {
					// animate the canvas with random points
					windy.field = field
					animate(bounds, field)
				})
			})
		}

		var stop = function() {
			if (windy.field) windy.field.release()
			if (animationLoop) cancelAnimationFrame(animationLoop)
		}

		var windy = {
			params: params,
			start: start,
			stop: stop,
			createField: createField,
			interpolatePoint: interpolate,
			setData: setData,
			setTransform: setTransform,
		}

		return windy
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id)
		}
	}

	function drawColorIndex(canvas, dataType, colors) {
		var width = canvas.width
		var height = canvas.height
		var context = canvas.getContext('2d')

		// clear
		context.clearRect(0, 0, width, height)

		var styles = _.clone(colors) // 복사
		if (['T3H', 'TMN', 'TMX', 'REH', 'WAV', 'WSD'].includes(dataType)) {
			styles.push({ rgb: '#333333', bound: 1000 })
		} else if (dataType === 'POP') {
			styles.push({ rgb: '#eeeeee', bound: 1000 })
		}
		styles.reverse()

		var len = styles.length
		var dy = height / len
		var position = LEAFLET_AFS_CONFIG.OVERLAY.COLOR_INDEX_POSITION
		var colorToText = LEAFLET_AFS_CONFIG.OVERLAY.COLOR_INDEX_TO_TEXT
		var units = LEAFLET_AFS_CONFIG.OVERLAY.UNITS

		for (var i = 0; i < len; i++) {
			// draw color bar
			context.fillStyle = styles[i].rgb
			context.fillRect(0, dy * i, 8, dy)

			// draw color text
			if (position[dataType].includes(i)) {
				context.fillStyle = '#333333'
				context.font = '500 10px "Noto Sans KR", sans-serif'
				if (dataType === 'SKY' || dataType === 'PTY') {
					var text = colorToText[dataType][i]
					for (var j = 0; j < text.length; j++) {
						context.fillText(
							text.charAt(j),
							11,
							dy * i + dy / 2 - 5 * (text.length - 1) + j * 10
						)
					}
				} else {
					context.fillText(styles[i].bound, 11, dy * i + 3)
				}
			}
		}

		if (units[dataType]) {
			context.fillStyle = '#222222'
			context.font = '500 10px "Noto Sans KR", sans-serif'
			context.fillText(units[dataType], 11, 8)
		}
	}

	return L
})
