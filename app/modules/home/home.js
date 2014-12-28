'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.home', ['ngRoute','firebase', 'wxApp.coremodules.cookies', 'wxApp.coremodules.conversions', 'wxApp.datamodules.firebase', 'wxApp.coremodules.maps', 'wxApp.directivemodules.search'])
 
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
.filter('TemperatureFilter', TemperatureFilter)
.filter('WindDirectionFilter', WindDirectionFilter);

// Dependency injections to controller, services, factories, providers, filters
HomeController.$inject =  ['$scope', 'FirebaseFeedService', 'CookiesService', 'MapsService'];
FirebaseFeedService.$inject = ['FirebaseDataService', 'MapsService'];
TemperatureFilter.$inject = ['ConversionsService'];
WindDirectionFilter.$inject = ['ConversionsService'];

// -- Function defining HomeController
// input : FirebaseFeedService
// 	 : scope
function HomeController($scope, FirebaseFeedService, CookiesService, MapsService) {
	var self = this;
	this.currentRegion = 'TX';
	this.headers = ['Name','Temperature','Pressure','Humidity','Wind Speed','Wind Direction'];
	this.sortOrderItems = ['+name', '+main.temp', '+main.pressure', '+main.humidity', '+wind.speed', '+wind.deg'];
	this.sortOrder = this.sortOrderItems[0];

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

	this.doSort = function(index){
		if (self.sortOrder == self.sortOrderItems[index]){
			if (self.sortOrder.indexOf('+') != -1){
				// switch current column to sort desc
				self.sortOrder = self.sortOrder.replace('+','-');
			} else {
				// switch current column to sort asc
				self.sortOrder = self.sortOrder.replace('-','+');
			}
		} else {
			// order by new column asc
			self.sortOrder = self.sortOrderItems[index];
		}
		document.getElementById('cityTable').scrollTop = 0;
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
			for (let i = 0;i < arrCities.length;i++){
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
// input : ref to ConversionService
// output : 
function TemperatureFilter(ConversionsService){
	return function(kelvin){
		return ConversionsService.getTemperatureKelvinToFahrenheit(kelvin);
	};
}

// -- Function defining WindDirectionFilter
// input : ref to ConversionService
// output :
function WindDirectionFilter(ConversionService){
	return function(deg){
		return ConversionService.getWindDirectionDegToText(deg);
	};
}

})(); // END IIFE
