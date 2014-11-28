'use strict';
(function(){ // START IIFE

angular.module('myApp.logout', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/logout', {
        templateUrl: 'logout/logout.html'
    });
}])
 
// Login controller
.controller('LogoutCtrl', LogoutController);

LogoutController.$inject =  ['$scope'];

function LogoutController($scope) {
	var self = this;

	document.cookie = 'username=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	
	location = '#login';
}

})(); // END IIFE
