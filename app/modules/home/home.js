'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.home', ['ngRoute','firebase', 'wxApp.coremodules.cookies', 'wxApp.coremodules.conversions', 'wxApp.datamodules.firebase', 'wxApp.coremodules.maps', 'wxApp.directivemodules.search', 'wxApp.directivemodules.footer', 'wxApp.directivemodules.alert', 'wxApp.coremodules.wxattributes'])
 
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
HomeController.$inject =  ['$scope', 'FirebaseFeedService', 'CookiesService', 'MapsService', 'ConversionsService', 'WxAttributesService'];
FirebaseFeedService.$inject = ['FirebaseDataService', 'MapsService'];
TemperatureFilter.$inject = ['ConversionsService'];
WindDirectionFilter.$inject = ['ConversionsService'];

// -- Function defining HomeController
// input : FirebaseFeedService
// 	 : scope
function HomeController($scope, FirebaseFeedService, CookiesService, MapsService, ConversionsService, WxAttributesService) {
	var self = this;
	// uses alert directive to set initial message and then clears it
	this.alertMessage = "Loading";
	setTimeout(function(){
		$scope.$apply(function(){
			self.alertMessage = "";
		});
	}, 2000);

	// initialization of default values
	this.alertType = "info";
	this.currentRegion = 'TX';
	this.headers = ['Name','Temperature','Pressure','Humidity','Wind Speed','Wind Direction'];
	this.sortOrderItems = ['+name', '+main.temp', '+main.pressure', '+main.humidity', '+wind.speed', '+wind.deg'];
	this.sortOrder = this.sortOrderItems[0];
	this.compare1 = undefined;
	this.compare2 = undefined;
    this.searchText = "";

	// checks that cookie is set
	// output : boolean
	this.testCookie = function(){
		if (CookiesService.getCookie('username') != ''){
			return true;
		} else {
			return false;
		}
	};

	// check that there is a valid cookie and redirect to login if not
	if (this.testCookie()){
		FirebaseFeedService.feed($scope, self);
	} else {
		location = '#login';	
	}

	// change region
	// - currentRegion which filters table
	// - redraws map
	this.switchRegion = function(evt, region){
		evt.stopPropagation();
		self.currentRegion = region;
		self.message = "";
		if (self.compare1 != undefined){
			self.compare1.selected = false;
			self.compare1 = undefined;
		}
		if (self.compare2 != undefined){
			self.compare2.selected = false;
			self.compare2 = undefined;
		}
		MapsService.drawMap(self.cities, self.currentRegion, 'map-canvas');
	};

	// handles sorting of city table
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


	// compare functionality between 2 cities
	// - calculates distance between cities to then be combined with humidity to find dryline
	this.selectCity = function(city){
		if (!city.selected){
			city.selected = true;
			// set compared city
			if (self.compare1 == undefined){
				self.compare1 = city;
			} else {
				if (self.compare2 != undefined)
					self.compare2.selected = false;
				self.compare2 = city;
			}

			// if two cities are selected then compute distance
			if (self.compare1 != undefined && self.compare2 != undefined){
				self.kmDistance = ConversionsService.getCoordinatesToDistance(self.compare1.coord.lat, self.compare1.coord.lon, self.compare2.coord.lat, self.compare2.coord.lon);
				self.message = "Distance from "+self.compare1.name+" to "+self.compare2.name+" is "+Math.round(self.kmDistance,2)+" km";
			}
		} else {
			city.selected = false;
			self.kmDistance = 0;
			self.kmDistanceText = "";
			// clear city out of compare
			if (self.compare1 != undefined){
				if (self.compare1.name == city.name)
					self.compare1 = undefined;
			}
			if (self.compare2 != undefined){
				if (self.compare2.name == city.name)
					self.compare2 = undefined;
			}
			if (self.compare1 == undefined || self.compare2 == undefined)
				self.message = "";
		}
	};

	this.selectDryline = function(){
		var drylineValues = WxAttributesService.calculateDrylineValues(self.cities, self.currentRegion);
		if (drylineValues[0].cityBHumidity > drylineValues[0].cityAHumidity)
			self.message = 'Greatest dryline between '+drylineValues[0].cityA+' ('+drylineValues[0].cityAHumidity+'%) and '+drylineValues[0].cityB+' ('+drylineValues[0].cityBHumidity+'%)';
		else
			self.message = 'Greatest dryline between '+drylineValues[0].cityB+' ('+drylineValues[0].cityBHumidity+'%) and '+drylineValues[0].cityA+' ('+drylineValues[0].cityAHumidity+'%)';
			
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
