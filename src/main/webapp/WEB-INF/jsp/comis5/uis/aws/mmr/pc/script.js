moment.locale('ko')

// 공통변수
var elements = LEAFLET_AFS_CONFIG.OVERLAY.ELEMENTS

// vuex
var store = new Vuex.Store({
	state: {
		date: moment('2018-08-23 17:00'),
		readData: 1,
		selected: 0, // selected dataType (elements)
		isOverlay: false,
	},
	mutations: {
		setSelected(state, idx) {
			Vue.set(state, 'selected', idx)
			if (idx === 11) {
				Vue.set(state, 'isOverlay', false)
			}
		},
		toggleOverlay(state) {
			Vue.set(state, 'isOverlay', !state.isOverlay)
		},
	},
})

var MapController = {
	template: `
	<div id="controller">
		<v-card class="ma-2 pa-2" :style="{ width: 170 + 'px' }">
			<v-checkbox 
				v-model="isOverlay"
				:label="'바람'"
				:disabled="disabled"
				class="mt-0 mb-2"
				hide-details
			></v-checkbox>
			<v-select
				v-model="selected"
				:items="items"
				item-text="name"
				item-value="index"   
				label="요소선택"
				solo
				dense
				full-width
				hide-details
			></v-select>
		</v-card>
	</div>
	`,
	data() {
		return {
			items: elements.map(function(el, index) {
				return {
					name: el.name,
					index: index,
				}
			}),
		}
	},
	computed: {
		isOverlay: {
			get() {
				return this.$store.state.isOverlay
			},
			set(val) {
				this.$store.commit('toggleOverlay')
			},
		},
		selected: {
			get() {
				return this.$store.state.selected
			},
			set(val) {
				this.$store.commit('setSelected', val)
			},
		},
		disabled() {
			return this.$store.state.selected === 10
		},
	},
}

var MapContent = {
	template: `<div id="map"></div>`,
	data() {
		return {
			map: null,
			overlayLayer: null,
			windLayer: null,
		}
	},
	computed: {
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
	},
	watch: {
		dataType(newDataType, oldDataType) {
			if (newDataType === 'WSD') {
				if (this.isOverlay) {
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
		isOverlay(newIsOverlay) {
			if (newIsOverlay) {
				this.drawWind(true)
			} else {
				this.clearWind()
			}
		},
	},
	mounted() {
		this.drawBaseMap()
		this.drawOverlay()
	},
	methods: {
		drawBaseMap() {
			// create map
			var map = L.map('map', {
				crs: L.Proj.CRS.Afs,
				minZoom: 9,
				maxZoom: 15,
				zoomControl: false,
				displayColorIndex: false,
			})

			// define center
			var bbox = LEAFLET_AFS_CONFIG.BASEMAP.BBOX
			var center = L.latLngBounds(bbox).getCenter()
			map.setView(center, 11)
			let polygon = L.polygon(bbox, { stroke: false, fill: false }).addTo(map)
			map.setView(polygon.getCenter())

			// create basemap layer
			var baseMapLayer = L.tileLayer.afsMapProvider('AfsMap.GRP_LD_GRY').addTo(map)
			var borderMapLayer1 = L.tileLayer
				.afsMapProvider('AfsMap.GRP_SL', { zIndex: 10, pane: 'overlayPane' })
				.addTo(map)
			var borderMapLayer2 = L.tileLayer
				.afsMapProvider('AfsMap.GRP_WC', { zIndex: 11, pane: 'overlayPane' })
				.addTo(map)

			this.map = map
		},
		drawOverlay() {
			var map = this.map
			var tmFc = this.tmFc
			var readData = this.readData
			var dataType = this.dataType
			var self = this

			axios
				.get('/afsOut/mmr/weatherman/retMmrWeathermanTest.kajx', {
					params: {
						tmFc: tmFc,
						readData: readData,
						dataType: dataType,
					},
				})
				.then(function(response) {
					var data = response.data.data

					if (self.overlayLayer) {
						self.overlayLayer.setData(data)
						return
					}

					self.overlayLayer = L.overlayLayer({ data: data }).addTo(map)
				})
		},
		drawWind() {
			var map = this.map
			var tmFc = this.tmFc
			var readData = this.readData
			var isOverlay = this.isOverlay
			var self = this

			axios
				.all([
					axios.get('/afsOut/mmr/weatherman/retMmrWeathermanTest.kajx', {
						params: {
							tmFc: tmFc,
							readData: readData,
							dataType: 'VEC',
						},
					}),
					axios.get('/afsOut/mmr/weatherman/retMmrWeathermanTest.kajx', {
						params: {
							tmFc: tmFc,
							readData: readData,
							dataType: 'WSD',
						},
					}),
				])
				.then(
					axios.spread(function(vec, wsd) {
						vec = vec.data.data
						wsd = wsd.data.data
						var data = { vec: vec, wsd: wsd }

						if (self.windLayer) {
							self.windLayer.setData(data, isOverlay)
							return
						}

						self.windLayer = L.windLayer({
							data: data,
							isOverlay: isOverlay,
						}).addTo(map)
					})
				)
		},
		clearOverlay() {
			if (this.overlayLayer) {
				this.overlayLayer.removeFrom(this.map)
				this.overlayLayer = null
			}
		},
		clearWind() {
			if (this.windLayer) {
				this.windLayer.removeFrom(this.map)
				this.windLayer = null
			}
		},
	},
}

// Create Vue
new Vue({
	el: '#app',
	store,
	components: { MapController, MapContent },
})
