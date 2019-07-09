<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
 		<%-- <base href="<c:url value='/'/>"> --%>
		<title>동네예보 모바일</title>
		<link rel="icon" href="data:;base64,iVBORw0KGgo=" />
 			<!-- 경로 변경(Yang) -->
		  <link rel='stylesheet' href='font/FontAwesome/css/all.min.css' />
		  <link rel='stylesheet' href='font/NotoSansKR/NotoSansKR.css' />
		  <link rel='stylesheet' href='font/WeatherIcon/css/weather-icons.min.css' />
		  <link rel='stylesheet' href='css/comis5/uis/vuetify.min.css' />
		  <link rel='stylesheet' href='css/comis5/uis/vue-slider-component.min.css' />
		  <link rel='stylesheet' href='css/comis5/uis/leaflet.css' />
		  <link rel='stylesheet' href='css/comis5/uis/leaflet.afs.overlay.css' />
		  <link rel='stylesheet' href='style.css' />
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
  <script src='js/common/vue/vue.js'></script>
  <script src='js/common/vue/vuex.min.js'></script>
  <script src='js/common/vue/vuetify.min.js'></script>
  <script src='js/common/vue/vue-slider-component.min.js'></script>
  <!-- 3rd lib -->
  <script src='js/common/axios.min.js'></script> 
  <script src='js/common/moment.min.js'></script>
  <script src='js/common/ko.js'></script>
  <script src='js/common/lodash.min.js'></script>
  <!-- map -->
  <script src='js/common/leaflet/leaflet.js'></script>
  <script src='js/common/leaflet/proj4.js'></script> <!-- Yang . 좌표계 변환 라이브러리 -->
  <script src='js/common/leaflet/proj4leaflet.min.js'></script>
  <script src='js/common/leaflet/leaflet.AFS.Config.js' charset="UTF-8"></script>
  <script src='js/common/leaflet/leaflet.AFS.Basemap.js' charset="UTF-8"></script>
  <script src='js/common/leaflet/leaflet.AFS.Overlay.js' charset="UTF-8"></script>
  <script src='script.js' charset="UTF-8"></script>
</body>
</html>