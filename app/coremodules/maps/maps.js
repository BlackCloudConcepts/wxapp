'use strict';
(function(){ // START IIFE

angular.module('wxApp.coremodules.maps', ['wxApp.coremodules.conversions', 'wxApp.coremodules.wxattributes', 'wxApp.coremodules.tools'])
.service('MapsService', MapsService);
MapsService.$inject = ['ConversionsService', 'WxAttributesService', 'ToolsService'];

function MapsService(ConversionsService, WxAttributesService, ToolsService){

	// generic mapping function to route to appropriate service
	// input: arrCities - array of cities and their related data
        //      : currentRegion - current region of cities to limit list to and focus map on
        //      : containerId - div to put the map in   
	this.drawMap = function(arrCities, currentRegion, containerId){
		this.drawGoogleMap(arrCities, currentRegion, containerId);
	}

	// draws google map with markers and popups for indicated locations
	// input: arrCities - array of cities and their related data
	//      : currentRegion - current region of cities to limit list to and focus map on
	//      : containerId - div to put the map in	
	this.drawGoogleMap = function(arrCities, currentRegion, containerId){
		// filter out cities by region
		var arr = [];
		for (var i = 0;i < arrCities.length; i++){
			if (arrCities[i].region == currentRegion){
				arr.push(arrCities[i]);
			}
		}
		arrCities = arr;

		// draw map
		var focusCoords = {};
		switch (currentRegion){
			case 'TX': 
				focusCoords.zoom = 7;
				focusCoords.lat = 30.76;
				focusCoords.lon = -98.68;
				break;
			case 'OK': 
				focusCoords.zoom = 8;
				focusCoords.lat = 35.47;
				focusCoords.lon = -97.52;
				break;
		}
		var mapOptions = {
			center: { lat: focusCoords.lat, lng: focusCoords.lon},
			zoom: focusCoords.zoom
		};
		var map = new google.maps.Map(document.getElementById(containerId), mapOptions);
	
		// add dryline layers
		// - http://geojson.org/geojson-spec.html#linestring	
		var drylineValues = WxAttributesService.calculateDrylineValues(arrCities, currentRegion);

		// calculate the top delta's in drylines
		var drylineCoordinates = [];
		for (var i = 0; i < 6;i++){
			var points = ToolsService.getPerpendicularLine(
				{lat:drylineValues[i].cityACoord.lat,lon:drylineValues[i].cityACoord.lon},
				{lat:drylineValues[i].cityBCoord.lat,lon:drylineValues[i].cityBCoord.lon}
			);
			drylineCoordinates.push({
				coords : [[[points.pointA.lon, points.pointA.lat],[points.pointB.lon, points.pointB.lat]]],
				delta : drylineValues[i].delta
			});
		}

		// define generic feature template
		var featureTemplate = {
			"type": "Feature",
			"properties": {
				"delta": undefined,
			},
			"geometry": {
				"type": "MultiLineString",
				"coordinates": undefined
			},
			"style" : {
				"strokeColor" : "green",
				"strokeWeight" : 4
			}
		}
		
		// define features data geoJSON object
		var myData = {
                        "type": "FeatureCollection",
                        "features": []
		};

		// add features for each dryline to be displayed
		for (var i = 0;i < drylineCoordinates.length;i++){
			// clone object
			var feature = JSON.parse(JSON.stringify(featureTemplate));
			feature.properties.delta = drylineCoordinates[i].delta;
			feature.geometry.coordinates = drylineCoordinates[i].coords;
			myData.features.push(feature);
		}

		// render geoJSON data
		map.data.addGeoJson(myData);

		// set colors on drylines based on delta
		map.data.setStyle(function(feature) {
		    	var delta = feature.getProperty('delta');
			var color = 'blue';
			if (delta > 1)
				color = 'red';
			else if (delta > .75)
				color = 'orange';
			else if (delta > .5)
				color = 'yellow';
			else if (delta > .1)
				color = 'green';
		    	return {
		      		strokeColor: color,
		      		strokeWeight: 4
		    	};
		});

		// add markers (icons/popups)
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
