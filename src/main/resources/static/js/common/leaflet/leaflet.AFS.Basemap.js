/**
 * leaflet.AFS.Basemap.js
 *
 * 기상청 좌표계 & TileMap 정의
 */
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
	 * 기상청 좌표계 적용
	 * dependencies: pro4.js, pro4leaflet.js
	 */
	// 기상청 좌표계
	var wgs84_grid =
		'+proj=lcc +lat_1=30 +lat_2=60 +lat_0=0 +lon_0=126 +x_0=0 +y_0=0 +datum=WGS84 +ellps=WGS84 +units=m +no_defs'

	// 좌표계 옵션
	var crsOption = {
		origin: [-35527048.949519001, 33688767.500765003],
		resolutions: [
			176389.241667372,
			88194.6208336861,
			44097.310416843,
			22577.8229334236,
			14675.5849067253,
			11288.9114667118,
			8466.68360003386,
			5644.45573335591,
			3386.67344001354,
			2822.22786667795,
			2257.78229334236,
			2116.67090000846,
			1411.11393333897,
			705.556966669489,
			352.778483334744,
			176.389241667372,
			88.1946208336861,
			44.097310416843,
			22.5778229334236,
			11.2889114667118,
			5.64445573335591,
			2.82222786667795,
		],
	}

	L.Proj.CRS.Afs = new L.Proj.CRS('u3:7001', wgs84_grid, crsOption)

	/**
	 * 기상청 TileMap 정의
	 */
	L.TileLayer.AfsMap = L.TileLayer.extend({
		options: {
			continuousWorld: true,
		},

		// 초기화
		initialize: function(urlTemplate, options) {
			L.TileLayer.prototype.initialize.call(this, urlTemplate, options)
		},

		// 포인트에 해당하는 Tile Url 반환
		getTileUrl: function(tilePoint) {
			var zoom = tilePoint.z
			var layerName = this._getLayerVariant(zoom)

			if (layerName == undefined || layerName == '') return '/images/uis/mmr/blank.png'

			return L.Util.template(
				this._url,
				L.Util.extend(
					{
						p: 'LCC',
						l: layerName,
						s: this._getSubdomain(tilePoint),
						z: this._getCurZoomLevelStr(tilePoint.z),
						x: this._getHexa8DigitStr(tilePoint.x),
						y: this._getHexa8Digit53DivideStr(tilePoint.y),
					},
					this.options
				)
			)
		},

		_projectedTileSize: function(zoom) {
			return this.options.tileSize / this.crs.scale(zoom)
		},

		_getLayerVariant: function(zoom) {
			var layerName = ''
			var layer = this.options.variantName
			var layerGroup = LEAFLET_AFS_CONFIG.BASEMAP.DISPLAY_LEVEL
			var layerSetGroup = LEAFLET_AFS_CONFIG.BASEMAP.LAYER_SET
			if (layerGroup[layer]) {
				layerName = layer
			} else if (layerSetGroup[layer]) {
				layerSetGroup[layer].forEach(function(elem) {
					if (zoom >= elem.minZoomLevel && zoom <= elem.maxZoomLevel) {
						layerName = elem.layerName
					}
				})
			} else {
				if (console) {
					console.error(
						'Occured error at _getLayerVariant() : ' +
							layer +
							'는 식별되지 않는 Back map layer / Back map layer set 입니다.'
					)
				}
			}
			return layerName
		},

		/**
		 * 숫자의 8자리 0으로 Padding된 16진수 문자열 반환
		 * @method afsmap.prototype.getHexa8DigitStr
		 * @return {String} hexa8DigitString
		 */
		_getHexa8DigitStr: function(num) {
			return ('00000000' + num.toString(16)).slice(-8)
		},

		/**
		 * 숫자의 8자리 0으로 Padding된 16진수 문자열을 구한 후 5자리, 3자리로 분리한 문자열 반환
		 * @method afsmap.prototype.getHexa8Digit53DivideStr
		 * @return {String} hexa8Digit53DivideString
		 */
		_getHexa8Digit53DivideStr: function(num) {
			return (
				('00000000' + num.toString(16)).slice(-8, -3) +
				'/' +
				('00000000' + num.toString(16)).slice(-3)
			)
		},

		/**
		 * 0이 Padding된 두자리 ZoomLevel 문자열 반환
		 * @method afsmap.prototype.getCurZoomLevelStr
		 * @return {String} CurrentZoomLevelString
		 */
		_getCurZoomLevelStr: function(num) {
			return ('00' + num).slice(-2)
		},
	})

	L.TileLayer.AfsMapProvider = L.TileLayer.AfsMap.extend({
		initialize: function(arg, options) {
			var providers = L.TileLayer.AfsMapProvider.providers
			var parts = arg.split('.')
			var providerName = parts[0]
			var variantName = parts[1]

			if (!providers[providerName]) {
				throw 'No such provider (' + providerName + ')'
			}

			var provider = {
				url: providers[providerName].url,
				crs: providers[providerName].crs,
				options: providers[providerName].options,
			}

			// overwrite values in provider from variant.
			if (variantName && 'variants' in providers[providerName]) {
				if (!(variantName in providers[providerName].variants)) {
					throw 'No such variant of ' + providerName + ' (' + variantName + ')'
				}
				var variant = providers[providerName].variants[variantName]
				var variantOptions
				if (typeof variant === 'string') {
					variantOptions = {
						variant: variant,
					}
				} else {
					variantOptions = variant.options
				}
				provider = {
					url: variant.url || provider.url,
					crs: variant.crs || provider.crs,
					options: L.Util.extend({}, provider.options, variantOptions),
				}
			} else if (typeof provider.url === 'function') {
				provider.url = provider.url(parts.splice(1).join('.'))
			}

			var forceHTTP = window.location.protocol === 'file:' || provider.options.forceHTTP
			if (provider.url.indexOf('//') === 0 && forceHTTP) {
				provider.url = 'http:' + provider.url
			}

			// If retina option is set
			if (provider.options.retina) {
				// Check retina screen
				if (options.detectRetina && L.Browser.retina) {
					// The retina option will be active now
					// But we need to prevent Leaflet retina mode
					options.detectRetina = false
				} else {
					// No retina, remove option
					provider.options.retina = ''
				}
			}

			// replace attribution placeholders with their values from toplevel provider attribution,
			// recursively
			var attributionReplacer = function(attr) {
				if (attr.indexOf('{attribution.') === -1) {
					return attr
				}
				return attr.replace(/\{attribution.(\w*)\}/, function(match, attributionName) {
					return attributionReplacer(providers[attributionName].options.attribution)
				})
			}
			provider.options.attribution = attributionReplacer(provider.options.attribution)
			provider.options.variantName = variantName

			// Compute final options combining provider options with any user overrides
			var layerOpts = L.Util.extend({}, provider.options, options)
			L.TileLayer.AfsMap.prototype.initialize.call(this, provider.url, layerOpts)
		},
	})

	L.TileLayer.AfsMapProvider.providers = {
		AfsMap: {
			url:
				'http://' +
				LEAFLET_AFS_CONFIG.BASEMAP.DOMAIN +
				'/' +
				LEAFLET_AFS_CONFIG.BASEMAP.URL +
				'/{p}_{l}/L{z}/R{y}/C{x}.png',
			crs: L.Proj.CRS.Afs,
			options: {
				maxZoom: 16,
				minZoom: 2,
				subdomains: LEAFLET_AFS_CONFIG.BASEMAP.DOMAIN,
				continuousWorld: true,
				attribution: '&copy; <a href="http://afso.kma.go.kr">AfsMap</a>',
			},
		},
	}

	L.tileLayer.afsMapProvider = function(provider, options) {
		return new L.TileLayer.AfsMapProvider(provider, options)
	}

	return L
})
