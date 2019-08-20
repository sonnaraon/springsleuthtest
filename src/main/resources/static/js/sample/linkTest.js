/**
 * 
 */
$(document).ready(function() {
	
	$("#testLink").click(function() {
		$.post("/sample/linkClicked.do", {
			systemName: "COMIS4"
	}).done( function(data, status) {
		window.location = data.rtnUrl;
	}).fail( function(data, status) {
		;
	}).always( function(data, status) {
		;
	});
	
	});
});
	