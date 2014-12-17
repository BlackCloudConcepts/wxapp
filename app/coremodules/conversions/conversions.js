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
	}

}

}
)(); // END IIFE

