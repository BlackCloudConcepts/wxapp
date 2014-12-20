'use strict';
(function(){ // START IIFE

angular.module('wxApp.coremodules.maps', ['wxApp.coremodules.conversions'])
.service('MapsService', MapsService);
MapsService.$inject = ['ConversionsService'];

function MapsService(ConversionsService){

	// draws google map with markers and popups for indicated locations
	// input: arrCities - array of cities and their related data
	//      : currentRegion - current region of cities to limit list to and focus map on
	//      : containerId - div to put the map in	
	this.drawMap = function(arrCities, currentRegion, containerId){
		// filter out cities by region
		var arr = [];
		for (var i = 0;i < arrCities.length; i++){
			if (arrCities[i].region == currentRegion){
				arr.push(arrCities[i]);
			}
		}
		arrCities = arr;

		// draw map
		var mapOptions = {
			center: { lat: arrCities[0].coord.lat, lng: arrCities[0].coord.lon},
			zoom: 8
		};
		var map = new google.maps.Map(document.getElementById(containerId), mapOptions);

		// add markers
		var markers = {};
		for (var i = 0;i < arrCities.length;i++){
			(function(){
				var name = arrCities[i].name;
				var temp = ConversionsService.getTemperatureKelvinToFahrenheit(arrCities[i].main.temp);
				var pressure = arrCities[i].main.pressure;
				var humidity = arrCities[i].main.humidity;
				var windspeed = arrCities[i].wind.speed;
				var winddirection = ConversionsService.getWindDirectionDegToText(arrCities[i].wind.deg);
				var contentString = '<div id="content" style="width:200px">'+
					'<div id="bodyContent">'+
					'<div>'+name+'</div>'+
					'<div style="font-size:8pt;">Temperature: '+temp+' &deg;F</div>'+
					'<div style="font-size:8pt;">Pressure: '+pressure+' mb</div>'+
					'<div style="font-size:8pt;">Humidity: '+humidity+' %</div>'+
					'<div style="font-size:8pt;">Wind Speed: '+windspeed+' km/h</div>'+
					'<div style="font-size:8pt;">Wind Direction: '+winddirection+'</div>'+
					'</div>'+
					'</div>';

				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});

				var lat = arrCities[i].coord.lat;
				var lon = arrCities[i].coord.lon;
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat,lon),
					map: map,
					title:name,
					icon:'http://cdnimages.magicseaweed.com/30x30/5.png'
				});
				markers[i] = marker;
				var x = i;
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,markers[x]);
				});
			})();
		}
	}
       
}

}
)(); // END IIFE
