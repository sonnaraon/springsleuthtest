<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<title>동네예보 모바일</title>
		<link rel="icon" href="data:;base64,iVBORw0KGgo=" />
		<link rel="stylesheet" href="./lib/font/FontAwesome/css/all.min.css" />
		<link rel="stylesheet" href="./lib/font/NotoSansKR/NotoSansKR.css" />
		<link rel="stylesheet" href="./lib/font/WeatherIcon/css/weather-icons.min.css" />
		<link rel="stylesheet" href="./lib/css/vuetify.min.css" />
		<link rel="stylesheet" href="./lib/css/vue-slider-component.min.css" />
		<link rel="stylesheet" href="./lib/css/leaflet.css" />
		<link rel="stylesheet" href="./lib/css/leaflet.afs.overlay.css" />
		<link rel="stylesheet" href="./style.css" />
	</head>
	<body>
		<!-- app -->
		<div id="vue-app" v-cloak>
			<v-app>
				<app-header></app-header>
				<app-content>
					<card>
						<element-picker></element-picker>
						<map-content></map-content>
						<time-player></time-player>
					</card>
				</app-content>
				<app-bottom></app-bottom>
			</v-app>
		</div>

		<!-- vue -->
		<script src="./lib/js/vue/vue.js"></script>
		<script src="./lib/js/vue/vuex.min.js"></script>
		<script src="./lib/js/vue/vuetify.min.js"></script>
		<script src="./lib/js/vue/vue-slider-component.min.js"></script>
		<!-- 3rd lib -->
		<script src="./lib/js/axios.min.js"></script>
		<script src="./lib/js/moment.min.js"></script>
		<script src="./lib/js/ko.js"></script>
		<script src="./lib/js/lodash.min.js"></script>
		<!-- map -->
		<script src="./lib/js/leaflet/leaflet.js"></script>
		<script src="./lib/js/leaflet/proj4.js"></script>
		<script src="./lib/js/leaflet/proj4leaflet.min.js"></script>
		<script src="./lib/js/leaflet/leaflet.AFS.Config.js"></script>
		<script src="./lib/js/leaflet/leaflet.AFS.Basemap.js"></script>
		<script src="./lib/js/leaflet/leaflet.AFS.Overlay.js"></script>
		<script src="./script.js"></script>
	</body>
</html>