"use strict";
(function () {
  // START IIFE

  angular.module("wxApp.coremodules.maps", ["wxApp.coremodules.conversions", "wxApp.coremodules.wxattributes", "wxApp.coremodules.tools"]).service("MapsService", MapsService);
  MapsService.$inject = ["ConversionsService", "WxAttributesService", "ToolsService"];

  function MapsService(ConversionsService, WxAttributesService, ToolsService) {
    // generic mapping function to route to appropriate service
    // input: arrCities - array of cities and their related data
    //      : currentRegion - current region of cities to limit list to and focus map on
    //      : containerId - div to put the map in  
    this.drawMap = function (arrCities, currentRegion, containerId) {
      this.drawGoogleMap(arrCities, currentRegion, containerId);
    };

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
    this.drawGoogleMap = function (arrCities, currentRegion, containerId) {
      // filter out cities by region
      var arr = [];
      for (var i = 0; i < arrCities.length; i++) {
        if (arrCities[i].region == currentRegion) {
          arr.push(arrCities[i]);
        }
      }
      arrCities = arr;

      // draw map
      var mapOptions = {
        center: { lat: arrCities[0].coord.lat, lng: arrCities[0].coord.lon },
        zoom: 8
      };
      var map = new google.maps.Map(document.getElementById(containerId), mapOptions);

      // add dryline layers
      // - http://geojson.org/geojson-spec.html#linestring	
      var drylineValues = WxAttributesService.calculateDrylineValues(arrCities, currentRegion);
      //		var drylineCoordinates1 = [[[drylineValues[0].cityACoord.lon, drylineValues[0].cityACoord.lat], [drylineValues[0].cityBCoord.lon, drylineValues[0].cityBCoord.lat]]];
      //		var drylineCoordinates2 = [[[drylineValues[1].cityACoord.lon, drylineValues[1].cityACoord.lat], [drylineValues[1].cityBCoord.lon, drylineValues[1].cityBCoord.lat]]];
      //		var drylineCoordinates3 = [[[drylineValues[2].cityACoord.lon, drylineValues[2].cityACoord.lat], [drylineValues[2].cityBCoord.lon, drylineValues[2].cityBCoord.lat]]];
      //
      // highest delta dryline
      var points = ToolsService.getPerpendicularLine({ lat: drylineValues[0].cityACoord.lat, lon: drylineValues[0].cityACoord.lon }, { lat: drylineValues[0].cityBCoord.lat, lon: drylineValues[0].cityBCoord.lon });
      var drylineCoordinates1 = [[[points.pointA.lon, points.pointA.lat], [points.pointB.lon, points.pointB.lat]]];
      // 2nd
      var points = ToolsService.getPerpendicularLine({ lat: drylineValues[1].cityACoord.lat, lon: drylineValues[1].cityACoord.lon }, { lat: drylineValues[1].cityBCoord.lat, lon: drylineValues[1].cityBCoord.lon });
      var drylineCoordinates2 = [[[points.pointA.lon, points.pointA.lat], [points.pointB.lon, points.pointB.lat]]];
      // 3rd
      var points = ToolsService.getPerpendicularLine({ lat: drylineValues[2].cityACoord.lat, lon: drylineValues[2].cityACoord.lon }, { lat: drylineValues[2].cityBCoord.lat, lon: drylineValues[2].cityBCoord.lon });
      var drylineCoordinates3 = [[[points.pointA.lon, points.pointA.lat], [points.pointB.lon, points.pointB.lat]]];
      var myData = {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          properties: {
            delta: drylineValues[0].delta },
          geometry: {
            type: "MultiLineString",
            coordinates: drylineCoordinates1
          },
          style: {
            strokeColor: "green",
            strokeWeight: 4
          }
        }, {
          type: "Feature",
          properties: {
            delta: drylineValues[1].delta },
          geometry: {
            type: "MultiLineString",
            coordinates: drylineCoordinates2
          },
          style: {
            strokeColor: "green",
            strokeWeight: 4
          }
        }, {
          type: "Feature",
          properties: {
            delta: drylineValues[2].delta },
          geometry: {
            type: "MultiLineString",
            coordinates: drylineCoordinates3
          },
          style: {
            strokeColor: "green",
            strokeWeight: 4
          }
        }]
      };
      map.data.addGeoJson(myData);
      map.data.setStyle(function (feature) {
        var delta = feature.getProperty("delta");
        var color = "blue";
        if (delta > 1) color = "red";else if (delta > 0.75) color = "orange";else if (delta > 0.5) color = "yellow";else if (delta > 0.1) color = "green";
        return {
          strokeColor: color,
          strokeWeight: 4
        };
      });

      // add markers
      var markers = {};
      for (var i = 0; i < arrCities.length; i++) {
        (function () {
          var name = arrCities[i].name;
          var temp = ConversionsService.getTemperatureKelvinToFahrenheit(arrCities[i].main.temp);
          var pressure = arrCities[i].main.pressure;
          var humidity = arrCities[i].main.humidity;
          var windspeed = arrCities[i].wind.speed;
          var winddirection = ConversionsService.getWindDirectionDegToText(arrCities[i].wind.deg);
          var contentString = "<div id=\"content\" style=\"width:200px\">" + "<div id=\"bodyContent\">" + "<div>" + name + "</div>" + "<div style=\"font-size:8pt;\">Temperature: " + temp + " &deg;F</div>" + "<div style=\"font-size:8pt;\">Pressure: " + pressure + " mb</div>" + "<div style=\"font-size:8pt;\">Humidity: " + humidity + " %</div>" + "<div style=\"font-size:8pt;\">Wind Speed: " + windspeed + " km/h</div>" + "<div style=\"font-size:8pt;\">Wind Direction: " + winddirection + "</div>" + "</div>" + "</div>";

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          var lat = arrCities[i].coord.lat;
          var lon = arrCities[i].coord.lon;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            title: name,
            icon: "http://cdnimages.magicseaweed.com/30x30/5.png"
          });
          markers[i] = marker;
          var x = i;
          google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, markers[x]);
          });
        })();
      }
    };
  }
})(); // END IIFE