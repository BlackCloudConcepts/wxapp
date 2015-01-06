'use strict';
(function(){ // START IIFE

angular.module('wxApp.coremodules.conversions', [])
.service('ConversionsService', ConversionsService);
ConversionsService.$inject = [];

function ConversionsService(){

	// -- calculates fahrenheit from kelvin
	// input : kelvin
	// output : fahrenheit
	this.getTemperatureKelvinToFahrenheit = function(kelvin){
		var f = (9/5)*(kelvin - 273) + 32;
		var multiplier = Math.pow(10,2);
		f = Math.round(f * multiplier) / multiplier;
		return f;
	};

	// -- calculates deg to text for wind direction
	// input : deg
	// output : text
	this.getWindDirectionDegToText = function(deg){
		if (deg>11.25 && deg<33.75){
		    	return "NNE";
		} else if (deg>33.75 && deg<56.25){
		 	return "ENE";
		} else if (deg>56.25 && deg<78.75){
		    	return "E";
		} else if (deg>78.75 && deg<101.25){
		    	return "ESE";
		} else if (deg>101.25 && deg<123.75){
		    	return "ESE";
		} else if (deg>123.75 && deg<146.25){
		    	return "SE";
		} else if (deg>146.25 && deg<168.75){
		    	return "SSE";
		} else if (deg>168.75 && deg<191.25){
		    	return "S";
		} else if (deg>191.25 && deg<213.75){
		    	return "SSW";
		} else if (deg>213.75 && deg<236.25){
		    	return "SW";
		} else if (deg>236.25 && deg<258.75){
		    	return "WSW";
		} else if (deg>258.75 && deg<281.25){
		    	return "W";
		} else if (deg>281.25 && deg<303.75){
		    	return "WNW";
		} else if (deg>303.75 && deg<326.25){
		    	return "NW";
		} else if (deg>326.25 && deg<348.75){
		    	return "NNW";
		} else{
		    	return "N"; 
		}	
	};

	// -- calculates the distance between to coordinate points 
	// - test w/ http://www.distancefromto.net/
	// input : lat1, lon1, lat2, lon2
	// output : distance in km
	this.getCoordinatesToDistance = function(lat1,lon1,lat2,lon2){
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
		    	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		    	Math.sin(dLon/2) * Math.sin(dLon/2)
		    	; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	};

	function deg2rad(deg) {
  		return deg * (Math.PI/180);
	}
}

}
)(); // END IIFE

