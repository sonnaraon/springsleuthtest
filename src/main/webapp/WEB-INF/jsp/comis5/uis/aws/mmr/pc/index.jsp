<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<title>동네예보 PC</title>
		<link rel="icon" href="data:;base64,iVBORw0KGgo=" />
		<link rel="stylesheet" href="./normalize.css" />
		<link rel="stylesheet" href="../m/lib/font/MaterialIcon/MaterialIcons.css" />
		<link rel="stylesheet" href="../m/lib/font/NotoSansKR/NotoSansKR.css" />
		<link rel="stylesheet" href="../m/lib/css/vuetify.min.css" />
		<link rel="stylesheet" href="../m/lib/css/leaflet.css" />
		<link rel="stylesheet" href="../m/lib/css/leaflet.afs.overlay.css" />
		<link rel="stylesheet" href="./style.css" />
	</head>
	<body>
		<!-- app -->
		<div id="app" v-cloak>
			<v-app>
				<map-controller></map-controller>
				<map-content></map-content>
			</v-app>
		</div>

		<!-- vue -->
		<script src="../m/lib/js/vue/vue.js"></script>
		<script src="../m/lib/js/vue/vuex.min.js"></script>
		<script src="../m/lib/js/vue/vuetify.min.js"></script>
		<!-- 3rd lib -->
		<script src="../m/lib/js/axios.min.js"></script>
		<script src="../m/lib/js/moment.min.js"></script>
		<script src="../m/lib/js/ko.js"></script>
		<script src="../m/lib/js/lodash.min.js"></script>
		<script src="../m/lib/js/d3.min.js"></script>
		<!-- map -->
		<script src="../m/lib/js/leaflet/leaflet.js"></script>
		<script src="../m/lib/js/leaflet/proj4.js"></script>
		<script src="../m/lib/js/leaflet/proj4leaflet.min.js"></script>
		<script src="../m/lib/js/leaflet/leaflet.AFS.Config.js"></script>
		<script src="../m/lib/js/leaflet/leaflet.AFS.Basemap.js"></script>
		<script src="../m/lib/js/leaflet/leaflet.AFS.Overlay.js"></script>
		<script src="./script.js"></script>
	</body>
</html>