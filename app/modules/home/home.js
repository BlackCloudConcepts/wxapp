'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.home', ['ngRoute','firebase', 'wxApp.coremodules.cookies', 'wxApp.coremodules.conversions'])
 
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
HomeController.$inject =  ['$scope', 'FirebaseFeedService', 'CookiesService', 'ConversionsService'];
FirebaseFeedService.$inject = ['$q', 'ConversionsService'];
TemperatureFilter.$inject = ['ConversionsService'];

// -- Function defining HomeController
// input : FirebaseFeedService
// 	 : scope
function HomeController($scope, FirebaseFeedService, CookiesService, ConversionsService) {
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
		GoogleMap(self.cities, self, ConversionsService);
	};
}

// -- Function defining FirebaseFeedService
// input : $q promise
function FirebaseFeedService($q, ConversionsService){
	var self = this;
	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com/wx/");

	// public functions
	this.feed = function($scope, callback){
		var arrCities = [];

		// initial page load
		var promise = self.getOnce();
		promise.then(function(message) {
			// convert obj to array
                        Object.keys(message).forEach(function(key) {
                                arrCities.push(message[key]);
                        });

                        callback.cities = arrCities;
                        GoogleMap(arrCities, callback, ConversionsService);
		}, function(error) {
  			alert('Failed: ' + error);
		});

		// handles updates
		// Would be nice to wrap these updates into a promise to keep them in the digest cycle
		// simple promises won't work since they only resolve once and there is no notify.
		firebaseObj.on('child_changed', function(snapshot) {
			var message = snapshot.val();
			for (var i = 0;i < arrCities.length;i++){
				if (message.name == arrCities[i].name){
					$scope.$apply(function(){
						arrCities[i] = message;
						document.getElementById('map-canvas').innerHTML = '';
						GoogleMap(arrCities,callback,ConversionsService);
					});
				}
			}
		});
	};

	this.getOnce = function(){
		var deferred = $q.defer();
		firebaseObj.once('value', function(snapshot) {
			var message = snapshot.val();
			deferred.resolve(message);
		});	
		return deferred.promise;
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

// -- generic function for creating google maps
// input : array of city data
// 	 : reference to controller scope
function GoogleMap(arrCities, _controller, ConversionsService){
	// filter out cities by region
	var arr = [];
	for (var i = 0;i < arrCities.length; i++){
		if (arrCities[i].region == _controller.currentRegion){
			arr.push(arrCities[i]);
		}
	}
	arrCities = arr;

	// draw map
	var mapOptions = {
		center: { lat: arrCities[0].coord.lat, lng: arrCities[0].coord.lon},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// add markers
	var markers = {};
	for (var i = 0;i < arrCities.length;i++){
		(function(){
			var name = arrCities[i].name;
			var temp = ConversionsService.getTemperatureKelvinToFahrenheit(arrCities[i].main.temp);
			var pressure = arrCities[i].main.pressure;
			var humidity = arrCities[i].main.humidity;
			var contentString = '<div id="content" style="width:200px">'+
				'<div id="bodyContent">'+
				'<div>'+name+'</div>'+
				'<div style="font-size:8pt;">Temperature: '+temp+' &deg;F</div>'+
				'<div style="font-size:8pt;">Pressure: '+pressure+' mb</div>'+
				'<div style="font-size:8pt;">Humidity: '+humidity+' %</div>'+
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

})(); // END IIFE
