'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.home', ['ngRoute','firebase', 'wxApp.coremodules.cookies', 'wxApp.coremodules.conversions', 'wxApp.datamodules.firebase', 'wxApp.coremodules.maps'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'modules/home/home.html'//,
//        controller: 'HomeCtrl' (removed since the html was also referencing the controller causing it to happen twice)
    });
}])
 
// Define controller, services, factories, providers, filters
.controller('HomeController', HomeController)
.service('FirebaseFeedService', FirebaseFeedService)
.filter('TemperatureFilter', TemperatureFilter);

// Dependency injections to controller, services, factories, providers, filters
HomeController.$inject =  ['$scope', 'FirebaseFeedService', 'CookiesService', 'MapsService'];
FirebaseFeedService.$inject = ['FirebaseDataService', 'MapsService'];
TemperatureFilter.$inject = ['ConversionsService'];

// -- Function defining HomeController
// input : FirebaseFeedService
// 	 : scope
function HomeController($scope, FirebaseFeedService, CookiesService, MapsService) {
	var self = this;
	this.currentRegion = 'TX';

	this.testCookie = function(){
		if (CookiesService.getCookie('username') != ''){
			return true;
		} else {
			return false;
		}
	};

	if (this.testCookie()){
		FirebaseFeedService.feed($scope, self);
	} else {
		location = '#login';	
	}

	this.switchRegion = function(evt, region){
		evt.stopPropagation();
		self.currentRegion = region;
		MapsService.drawMap(self.cities, self.currentRegion, 'map-canvas');
	};
}

// -- Function defining FirebaseFeedService
// input : $q promise
function FirebaseFeedService(FirebaseDataService, MapsService){
	var self = this;

	// public functions
	this.feed = function($scope, callback){
		var arrCities = [];

		var callbackFullDataset = function(message){
			// convert obj to array
                        Object.keys(message).forEach(function(key) {
                                arrCities.push(message[key]);
                        });

                        callback.cities = arrCities;
			MapsService.drawMap(arrCities, callback.currentRegion, 'map-canvas');
		};
		FirebaseDataService.getFullDataset(callbackFullDataset);

		var callbackUpdates = function(message){
			for (var i = 0;i < arrCities.length;i++){
                                if (message.name == arrCities[i].name){
                                        $scope.$apply(function(){
                                                arrCities[i] = message;
                                                document.getElementById('map-canvas').innerHTML = '';
						MapsService.drawMap(arrCities, callback.currentRegion, 'map-canvas');
                                        });
                                }
                        }
		};
		FirebaseDataService.getUpdates(callbackUpdates);
	};
}

// -- Function defining TemperatureFilter
// input : None
// output : 
function TemperatureFilter(ConversionsService){
	return function(kelvin){
		return ConversionsService.getTemperatureKelvinToFahrenheit(kelvin);
	};
}

})(); // END IIFE
