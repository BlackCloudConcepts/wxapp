'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.logout', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/logout', {
        templateUrl: 'modules/logout/logout.html'
    });
}])
 
// Define controller, services, factories, providers, filters
.controller('LogoutController', LogoutController);

// Dependency injections to controller, services, factories, providers, filters
LogoutController.$inject =  ['$scope'];

// -- Function defining LogoutController
// input : scope
function LogoutController($scope) {
	var self = this;

	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com/wx/");
	firebaseObj.unauth();
	document.cookie = 'username=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	
	location = '#login';
}

})(); // END IIFE
