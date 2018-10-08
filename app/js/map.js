'use strict';

(function ($) {
	function initMap() {

		var myLatLng = {lat: 55.882083, lng: 37.0358483};

		var map = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			zoom: 16
		});

		var marker = new google.maps.Marker({
			map: map,
			position: myLatLng,
			title: 'Woodstone'
		});
	};

	initMap();

})(jQuery)
