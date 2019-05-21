moment.locale('ko')

// config (공통변수)
var elements = LEAFLET_AFS_CONFIG.OVERLAY.ELEMENTS
var times = LEAFLET_AFS_CONFIG.OVERLAY.TIMES
var forecastCount = LEAFLET_AFS_CONFIG.OVERLAY.FORECAST_COUNT

// vuex
var store = new Vuex.Store({
	state: {
		date: moment('2018-05-01 17:00'),
		selected: 0, // 선택된 elements index
		readData: 1,
		isOverlay: false,
		timer: null,
		loadOnce: false,
	},
	getters: {
		maxForecastCount(state) {
			var hour = state.date.hour()
			var code = elements[state.selected].code
			return forecastCount[code][hour]
		},
	},
	mutations: {
		setDate(state, date) {
			// 다르면 세팅
			if (!state.date.isSame(date)) {
				state.date = date
				this.dispatch('reset')
			}
		},
		setSelected(state, idx) {
			// 선택된 readData가 maxCnt보다 클때 처리
			Vue.set(state, 'loadOnce', true)
			var maxCnt = forecastCount[elements[idx].code][state.date.hour()]
			if (state.readData > maxCnt) {
				Vue.set(state, 'readData', maxCnt)
			}

			Vue.set(state, 'selected', idx)
			if (idx === 11) {
				Vue.set(state, 'isOverlay', false)
			}
			this.dispatch('resetTimer')
		},
		setLoadOnce(state) {
			Vue.set(state, 'loadOnce', false)
		},
		toggleOverlay(state) {
			Vue.set(state, 'isOverlay', !state.isOverlay)
		},
		setReadData(state, val) {
			Vue.set(state, 'loadOnce', false)
			Vue.set(state, 'readData', val)
		},
		toggleTimer(state, bool) {
			if (bool) {
				Vue.set(state, 'timer', bool)
			} else {
				clearInterval(state.timer)
				Vue.set(state, 'timer', null)
			}
		},
	},
	actions: {
		reset(context) {
			context.commit('setReadData', 1)
			context.commit('toggleTimer', false)
		},
		resetTimer(context) {
			context.commit('toggleTimer', false)
		},
	},
})

// =====================================
/**
 * Common Component 모음
 */

// Card
Vue.component('card', {
	template: `
	<v-card class="mb-2 pa-3 elevation-1 custom-card">
		<slot></slot>
	</v-card>
	`,
})

// SelectBox
Vue.component('select-box', {
	props: ['label', 'items', 'value', 'onInput'],
	template: `
	<v-select
		class="select-box mb-3"
		:value="value"
		@input="onInput"
		:items="items"
		:label="label"
		item-text="text"
		item-value="value"   
		solo
		dense
		hide-details
		full-width
		append-icon="fas fa-angle-down"
	></v-select>
	`,
})

// ======================================

// Toolbar
var Toolbar = {
	template: `
	<v-toolbar dense class="elevation-0">
		<v-btn icon flat color="blue" class="mr-0">
			<v-icon>fas fa-bars</v-icon>
		</v-btn>
		<v-toolbar-title class="ml-0">{{ title }}</v-toolbar-title>
		<v-icon color="blue" :style="styleObj">fas fa-text-height</v-icon>
	</v-toolbar>
	`,
	data() {
		return {
			title: '동네예보',
			styleObj: {
				margin: '11px 0px 11px 11px',
				fontSize: '16px',
			},
		}
	},
}

// Location
var LocationInformation = {
	template: `
	<v-card class="elavation-1 text-xs-center pa-1 blue--text" :style="styleObj">
		<span>{{ location }}</span>
		<i class="fas fa-map-marker-alt"></i>
	</v-card>
	`,
	data() {
		return {
			location: '전라남도',
			styleObj: {
				boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
			},
		}
	},
}

// ViewTab
var ViewTab = {
	template: `
	<v-tabs
		v-model="tab"
		color="transparent"
		grow
		class="view-tab"
	>
		<v-tabs-slider color="blue"></v-tabs-slider>
		<v-tab
			v-for="item in items"
			:key="item"
		>
			{{ item }}
		</v-tab>
	</v-tabs>
	`,
	data() {
		return {
			tab: null,
			items: ['전국', '지점'],
		}
	},
}

// AppHeader
var AppHeader = {
	template: `
	<div class="app-header">
		<toolbar></toolbar>
		<location-information></location-information>
		<view-tab></view-tab>
	</div>
	`,
	components: {
		Toolbar,
		LocationInformation,
		ViewTab,
	},
}

// =================================================

// Element Picker
var ElementPicker = {
	template: `
	<v-layout row>
		<v-flex px-1 xs5>
			<v-menu
				v-model="menu"
				:close-on-content-click="false"
				:nudge-right="40"
				lazy
				transition="scale-transition"
				offset-y
				full-width
				min-width="290px"
			>
				<template v-slot:activator="{ on }">
					<v-text-field
						class="select-box mb-3"
						v-model="date"
						label="날짜"
						append-icon="fas fa-calendar"
						readonly
						solo
						v-on="on"
						hide-details
						full-width
					></v-text-field>
				</template>
				<v-date-picker
					v-model="date"
					@input="menu = false"
					locale="ko-kr"
					no-title
					prev-icon="fas fa-angle-left"
					next-icon="fas fa-angle-right"
				></v-date-picker>
			</v-menu>
		</v-flex>
		<v-flex px-1 xs3>
			<select-box
				:value="time"
				:onInput="setTime"
				:items="times"
				label="시간"
			></select-box>
		</v-flex>
		<v-flex px-1 xs4>
			<select-box
				:value="element"
				:onInput="setElement"
				:items="elements"
				label="요소"
			></select-box>
		</v-flex>
	</v-layout>
	`,
	data() {
		return {
			menu: false,
			times: times.map(function(el) {
				return {
					text: el + '시',
					value: el,
				}
			}),
			elements: elements.map(function(el, index) {
				return {
					text: el.name,
					value: index,
				}
			}),
		}
	},
	computed: {
		date: {
			get() {
				return moment(this.$store.state.date).format('YYYY-MM-DD')
			},
			set(val) {
				var date = moment(val).set('hour', Number(this.time))
				this.$store.commit('setDate', date)
			},
		},
		time() {
			return moment(this.$store.state.date).format('HH')
		},
		element() {
			return this.$store.state.selected
		},
	},
	methods: {
		setTime(val) {
			var date = moment(this.date).set('hour', Number(val))
			this.$store.commit('setDate', date)
		},
		setElement(val) {
			this.$store.commit('setSelected', val)
		},
	},
}

// Switch
var OverlaySwitch = {
	template: `
	<v-switch
		:value="isOverlay"
		@change="onChange"
		label="바람ON"
		class="ma-0 pa-0 wind-switch"
		color="blue"
		v-if="show"
		hide-details
	></v-switch>
	`,
	computed: {
		isOverlay() {
			return this.$store.state.isOverlay
		},
		show() {
			return this.$store.state.selected !== 10
		},
	},
	methods: {
		onChange() {
			this.$store.commit('toggleOverlay')
		},
	},
}

// Map-Content
var MapContent = {
	template: `
	<div id="map-content"
		:style="{ width: width + 31 + 'px', height: height + 'px' }"
	>
	<overlay-switch></overlay-switch>
		<div :id="borderId" :style="{ width: width + 9 + 'px', height: height + 'px' }"></div>
		<div :id="mapId" :style="{ width: width + 'px', height: height + 'px' }"></div>
		<canvas :id="colorIndexId" :style="{ width: 31 + 'px', height: height + 'px' }"></canvas>
	</div>
	`,
	data: function() {
		return {
			width: 263,
			// id
			mapId: 'fc-map',
			borderId: 'fc-border',
			colorIndexId: 'fc-color-index',
			// map
			map: null,
			// layer
			baseMapLayer: null,
			overlayLayer: null,
			windLayer: null,
		}
	},
	computed: {
		height() {
			return (
				this.width *
				(LEAFLET_AFS_CONFIG.OVERLAY.FIELD.y / LEAFLET_AFS_CONFIG.OVERLAY.FIELD.x)
			)
		},
		tmFc() {
			return this.$store.state.date.format('YYYYMMDDHH00')
		},
		readData() {
			return this.$store.state.readData
		},
		dataType() {
			return elements[this.$store.state.selected].code
		},
		isOverlay() {
			return this.$store.state.isOverlay
		},
		loadOnce() {
			return this.$store.state.loadOnce
		},
	},
	async mounted() {
		this.drawBaseMap()
		// default: T3H
		await this.drawOverlay()
		this.setMapEvent()
	},
	watch: {
		dataType(newDataType, oldDataType) {
			if (newDataType === 'WSD') {
				if (this.isOverlay) {
					// isOverlay => false
					this.$store.commit('toggleOverlay')
				}
				this.drawWind()
				this.clearOverlay()
			} else {
				this.drawOverlay()
				if (oldDataType === 'WSD') {
					this.clearWind()
				}
			}
		},
		tmFc() {
			if (this.dataType === 'WSD') {
				this.drawWind()
			} else {
				this.drawOverlay()
				if (this.isOverlay) {
					this.drawWind(true)
				}
			}
		},
		readData() {
			if (this.loadOnce) {
				this.$store.commit('setLoadOnce')
				return
			}

			if (this.dataType === 'WSD') {
				this.drawWind()
			} else {
				this.drawOverlay()
				if (this.isOverlay) {
					this.drawWind(true)
				}
			}
		},
		isOverlay(newIsOverlay) {
			this.baseMapLayer.removeFrom(this.map)
			if (newIsOverlay) {
				this.drawWind(true)
				this.baseMapLayer = L.tileLayer.afsMapProvider('AfsMap.GRP_LD_GRY', { zIndex: 1 })
			} else {
				this.clearWind()
				this.baseMapLayer = L.tileLayer.afsMapProvider('AfsMap.GRP_LD', { zIndex: 1 })
			}
			this.baseMapLayer.addTo(this.map)
		},
	},
	methods: {
		drawBaseMap() {
			// create map
			var map = L.map(this.mapId, {
				crs: L.Proj.CRS.Afs,
				maxBoundsViscosity: 1.0,
				zoomControl: false,
				dragging: false,
				displayColorIndex: true,
				minZoom: 9,
				maxZoom: 15,
			})
			this.map = map

			// default view
			var bbox = LEAFLET_AFS_CONFIG.BASEMAP.BBOX
			var center = L.latLngBounds(bbox).getCenter()
			map.setView(center, 9)

			// set view again
			var polygon = L.polygon(bbox, { stroke: false, fill: false }).addTo(map)
			map.setView(polygon.getCenter())
			map.setMaxBounds(polygon.getBounds())

			// forecast map config
			map.on('zoomend', function(e) {
				if (e.target.getZoom() === 9) {
					map.dragging.disable()
					map.setView(polygon.getCenter())
				} else {
					map.dragging.enable()
				}
			})

			// create basemap layer
			this.baseMapLayer = L.tileLayer.afsMapProvider('AfsMap.GRP_LD')
			this.baseMapLayer.addTo(map)
			L.tileLayer
				.afsMapProvider('AfsMap.GRP_SL', { zIndex: 10, pane: 'overlayPane' })
				.addTo(map)
			L.tileLayer
				.afsMapProvider('AfsMap.GRP_WC', { zIndex: 11, pane: 'overlayPane' })
				.addTo(map)
			L.tileLayer
				.afsMapProvider('AfsMap.GRP_SGG_KOR', { zIndex: 12, pane: 'overlayPane' })
				.addTo(map)
		},
		setMapEvent() {
			var self = this
			var map = this.map
			map.on('click', function(e) {
				var div = e.target.getContainer()
				L.DomEvent.on(div, 'zoomstart', L.DomEvent.stopPropagation)

				// ===================================

				var layer = self.overlayLayer
				if (self.dataType === 'WSD' || !layer) {
					return
				}

				var size = map.getSize()
				var zoom = map.getZoom()
				var zoomScale = map.getZoomScale(zoom, 9)
				var ratio = (size.x / LEAFLET_AFS_CONFIG.OVERLAY.FIELD.x) * zoomScale
				var ltc = LEAFLET_AFS_CONFIG.OVERLAY.COORDS[0]

				var point = map.project(e.latlng, zoom)
				var origin = map.project(L.latLng(ltc.lat, ltc.lng), zoom)
				var diff = point
					.subtract(origin)
					.divideBy(ratio)
					.floor()
					.add(L.point(0, 1))

				console.log(diff)
			})
		},
		// ========= overlay (pixelmap) ============ royeon 수정
		async drawOverlay() {
			var { tmFc, readData, dataType } = this

			var response = await axios.get('/comis5/uis/aws/mmr/retMmrWeathermanTest.kajx', {
//			var response = await axios.get('/comis5/uis/aws/mmr/retMmrTxtTest.kajx', {
				params: {
					tmFc,
					readData: dataType === 'R06' || dataType === 'S06' ? readData - 1 : readData,
					dataType,
				},
			})

			var data = response.data.data

			if (this.overlayLayer) {
				this.overlayLayer.setData(data)
				return
			}

			this.overlayLayer = L.overlayLayer({
				data: data,
			})
			this.overlayLayer.addTo(this.map)
		},
		clearOverlay() {
			if (this.overlayLayer) {
				this.overlayLayer.removeFrom(this.map)
				this.overlayLayer = null
			}
		},
		// ========= wind ============
		async drawWind(isOverlay) {
			var { tmFc, readData } = this

			// Get wind data
			var [vec, wsd] = await Promise.all([
				await axios.get('/comis5/uis/aws/mmr/retMmrWeathermanTest.kajx', {
					params: {
						tmFc,
						readData,
						dataType: 'VEC',
					},
				}),
				await axios.get('/comis5/uis/aws/mmr/retMmrWeathermanTest.kajx', {
					params: {
						tmFc,
						readData,
						dataType: 'WSD',
					},
				}),
			])

			vec = vec.data.data
			wsd = wsd.data.data
			var data = { vec: vec, wsd: wsd }

			if (this.windLayer) {
				this.windLayer.setData(data, isOverlay)
				return
			}

			this.windLayer = L.windLayer({
				data: data,
				isOverlay: isOverlay,
				frameRate: 20,
				velocityScale: 0.2,
				// particleAge: 3,
				// particleMultiplier: 0.005,
			})
			this.windLayer.addTo(this.map)
		},
		clearWind() {
			if (this.windLayer) {
				this.windLayer.removeFrom(this.map)
				this.windLayer = null
			}
		},
	},
	components: {
		OverlaySwitch,
	},
}

// TimePlayer
var TimePlayer = {
	template: `
	<v-layout row wrap align-center justify-center class="mt-4">
		<v-flex shrink class="mr-3">
			<v-icon
				v-if="!playing"
				color="blue"
				@click="onPlay"
				:style="styleObj"
			>
				fas fa-play
			</v-icon>
			<v-icon
				v-if="playing"
				color="blue"
				@click="onPause"
				:style="styleObj"
			>
				fas fa-pause
			</v-icon>
		</v-flex>
		<v-flex grow>
			<vue-slider 
				v-model.number="readData"
				:interval="1"
				:min="1"
				:max="maxCnt"
				:marks="true"
				:hide-label="true"
				:tooltip="'always'"
				:absorb="true"
				:lazy="true"
				:tooltip-formatter="formatter"
				:process="false"
			></vue-slider>
		</v-flex>
	</v-layout>
	`,
	data() {
		return {
			delaySlider: null,
			readData: 1,
			watchSelected: true,
			styleObj: {
				fontSize: '14px',
				lineHeight: '20px',
			},
		}
	},
	computed: {
		date() {
			return this.$store.state.date
		},
		selected() {
			return this.$store.state.selected
		},
		maxCnt() {
			return this.$store.getters.maxForecastCount
		},
		playing() {
			return Boolean(this.$store.state.timer)
		},
	},
	watch: {
		readData() {
			if (this.watchSelected) {
				setTimeout(() => {
					this.$store.commit('setReadData', this.readData)
				}, 300)
			}
			this.watchSelected = true
		},
		selected() {
			if (this.readData > this.maxCnt) {
				this.readData = this.maxCnt
				this.watchSelected = false
			}
		},
	},
	methods: {
		onPlay() {
			var timer = setInterval(() => {
				if (this.readData === this.maxCnt) {
					this.readData = 1
				} else {
					this.readData = this.readData + 1
				}
			}, 1000)
			this.$store.commit('toggleTimer', timer)
		},
		onPause() {
			this.$store.commit('toggleTimer', false)
		},
		formatter(val) {
			var m = moment(this.date)
			if (this.selected === 6 || this.selected === 7) {
				var r = Math.floor(m.hour() / 3) % 2
				m.add(4 + 6 * (val - 1) + 3 * r, 'hours')
			} else if (this.selected === 1 || this.selected === 2) {
				var h = m.hour()
				if (this.selected === 1) {
					// TMN
					m.add((h !== 2 ? 1 : 0) + val - 1, 'days')
				} else {
					// TMX
					m.add((h >= 14 ? 1 : 0) + val - 1, 'days')
				}
			} else {
				m.add(4 + 3 * (val - 1), 'hours')
			}

			if (this.selected === 1) {
				return m.date() + '일최저'
			} else if (this.selected === 2) {
				return m.date() + '일최고'
			} else {
				return m.hour() + 'H'
			}
		},
	},
	components: {
		VueSlider: window['vue-slider-component'],
	},
}

// AppContent
var AppContent = {
	template: `
	<v-content class="app-content">
		<v-container fluid class="pa-2">
			<slot></slot>
		</v-container>
	</v-content>
	`,
}

// =================================================

var AppBottom = {
	template: `
	<v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
	  color="transparent"
	  class="app-bottom"
	  height="50"
    >
		<v-btn
			color="blue"
			flat
			value="forecast"
		>
			<span>동네예보</span>
			<v-icon>fas fa-cloud-sun</v-icon>
		</v-btn>
		<v-btn
			color="blue"
			flat
			value="danger"
		>
			<span>위험기상</span>
			<v-icon>fas fa-bell</v-icon>
		</v-btn>

		<v-btn
			color="blue"
			flat
			value="personal"
		>
			<span>개인메뉴</span>
			<v-icon>fas fa-user</v-icon>
		</v-btn>
    </v-bottom-nav>
	`,
	data() {
		return {
			bottomNav: 'forecast',
		}
	},
}

// Create Vue
new Vue({
	el: '#vue-app',
	store,
	components: {
		AppHeader,
		AppContent,
		AppBottom,
		// additional
		ElementPicker,
		MapContent,
		TimePlayer,
	},
})
