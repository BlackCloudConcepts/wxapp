'use strict';
//(function(){ // START IIFE

angular.module('myApp.home', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html'//,
//        controller: 'HomeCtrl' (removed since the html was also referencing the controller causing it to happen twice)
    });
}])
 
// Home controller
//.controller('HomeCtrl', ['FirebaseService', '$scope', FirebaseLoginController]) // replaced with $inject
.controller('HomeCtrl', FirebaseLoginController)
.service('FirebaseServiceFeed', FirebaseServiceFeed)
.filter('toF', TemperatureFilter);

FirebaseLoginController.$inject =  ['FirebaseServiceFeed', '$scope'];
FirebaseServiceFeed.$inject = ['$q'];

function FirebaseLoginController(FirebaseServiceFeed, $scope) {
	var self = this;
	this.currentRegion = 'TX';
/*
	if (getCookie('username') != ''){
		FirebaseServiceFeed.feed($scope, self);
	} else {
		location = '#login';
	}
*/

	this.testCookie = function(){
		if (getCookie('username') != ''){
			return true;
		} else {
			return false;
		}
	};

	if (this.testCookie()){
		FirebaseServiceFeed.feed($scope, self);
	} else {
		location = '#login';	
	}

	this.switchRegion = function(evt, region){
		evt.stopPropagation();
		self.currentRegion = region;
		GoogleMap(self.cities, self);
	};
}

function FirebaseServiceFeed($q){
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

//                        $scope.$apply(function(){
                             callback.cities = arrCities;
//                        });
                        GoogleMap(arrCities, callback);
		}, function(error) {
  			alert('Failed: ' + error);
		});
/*
		firebaseObj.once('value', function(snapshot) {
			var message = snapshot.val();

			// convert obj to array
			Object.keys(message).forEach(function(key) {
				arrCities.push(message[key]);
			});

			$scope.$apply(function(){
			     callback.cities = arrCities;
			});
			GoogleMap(arrCities);

		});
*/

		// handles updates
		firebaseObj.on('child_changed', function(snapshot) {
			var message = snapshot.val();
			for (var i = 0;i < arrCities.length;i++){
				if (message.name == arrCities[i].name){
					$scope.$apply(function(){
						arrCities[i] = message;
						document.getElementById('map-canvas').innerHTML = '';
						GoogleMap(arrCities,callback);
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

function TemperatureFilter(){
	return function(kelvin){
		return getTemperature(kelvin);
/*
		var f = (9/5)*(kelvin - 273) + 32;
		var multiplier = Math.pow(10,2);
		f = Math.round(f * multiplier) / multiplier;
		return f;
*/
	};
}

function getTemperature(kelvin){
	var f = (9/5)*(kelvin - 273) + 32;
       	var multiplier = Math.pow(10,2);
        f = Math.round(f * multiplier) / multiplier;
        return f;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function GoogleMap(arrCities, _controller){
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
			var temp = getTemperature(arrCities[i].main.temp);
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

//})(); // END IIFE
