'use strict';
(function(){ // START IIFE

angular.module('wxApp.coremodules.maps', ['wxApp.coremodules.conversions', 'wxApp.coremodules.wxattributes'])
.service('MapsService', MapsService);
MapsService.$inject = ['ConversionsService', 'WxAttributesService'];

function MapsService(ConversionsService, WxAttributesService){

	// generic mapping function to route to appropriate service
	// input: arrCities - array of cities and their related data
        //      : currentRegion - current region of cities to limit list to and focus map on
        //      : containerId - div to put the map in   
	this.drawMap = function(arrCities, currentRegion, containerId){
		this.drawGoogleMap(arrCities, currentRegion, containerId);
	}

/*
	// draws open layer map 
	// input: arrCities - array of cities and their related data
        //      : currentRegion - current region of cities to limit list to and focus map on
        //      : containerId - div to put the map in   
	this.drawOpenLayerMap = function(arrCities, currentRegion, containerId){
		// filter out cities by region
                var arr = [];
                for (var i = 0;i < arrCities.length; i++){
                        if (arrCities[i].region == currentRegion){
                                arr.push(arrCities[i]);
                        }
                }
                arrCities = arr;

		// http://www.peterrobins.co.uk/it/olchangingprojection.html
		//Maps Center 
		var lat = arrCities[0].coord.lat; 
		var lon = arrCities[0].coord.lon;
console.log(lat);
console.log(lon);
//		lat = 7486473;
//		lon = 4193332;
		var lonlat = new OpenLayers.LonLat(lon, lat);
	    	var map = new OpenLayers.Map(containerId);


		// Create overlays

		// OSM layer
	    	var mapnik = new OpenLayers.Layer.OSM();
		// stations layer
		var stations = new OpenLayers.Layer.Vector.OWMStations("Stations");
		// weather layer
		var city = new OpenLayers.Layer.Vector.OWMWeather("Weather");

		//connect layers to map
		map.addLayers([mapnik, stations, city]);

		//Add Layers swither
		map.addControl(new OpenLayers.Control.LayerSwitcher());       	

		map.setCenter( lonlat, 10 );

		// Add popups 
		var selectControl = new OpenLayers.Control.SelectFeature([city,stations]);
		map.addControl(selectControl);
		selectControl.activate(); 
	}
*/

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

		// find drylines
		var drylineValues = WxAttributesService.calculateDrylineValues(arrCities, currentRegion);
		var drylineCoordinates = [[[drylineValues[0].cityACoord.lon, drylineValues[0].cityACoord.lat], [drylineValues[0].cityBCoord.lon, drylineValues[0].cityBCoord.lat]]];

		// draw map
		var mapOptions = {
			center: { lat: arrCities[0].coord.lat, lng: arrCities[0].coord.lon},
			zoom: 8
		};
		var map = new google.maps.Map(document.getElementById(containerId), mapOptions);
	
		// build any visualization data dynamically
		// http://geojson.org/geojson-spec.html#linestring	
		var myData = {
		  "type": "FeatureCollection",
		  "features": [
		    {
		      "type": "Feature",
		      "properties": {
			"letter": "G",
			"color": "blue",
			"rank": "7",
			"ascii": "71"
		      },
		      "geometry": {
//			"type": "Polygon",
/*			"coordinates": [
			  [
			    [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
			    [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
			    [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
			    [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
			    [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
			    [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
			    [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
			    [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
			  ]
			]*/
			"type": "MultiLineString",
			"coordinates": drylineCoordinates
//			"coordinates": [[[-97.93, 29.89],[-97.93, 30.08]]]
		      }
		    }
		  ]
		};

		map.data.addGeoJson(myData);
//		map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json');

		var featureStyle = {
//		    fillColor: 'green',
			strokeColor: 'green',
			strokeWeight: 4
		}
		map.data.setStyle(featureStyle);

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
