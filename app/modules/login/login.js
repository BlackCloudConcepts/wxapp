'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.login', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'modules/login/login.html'
    });
}])

// Define controller, services, factories, providers, filters 
.controller('LoginController', LoginController)
.service('FirebaseService', [FirebaseService]);

// Dependency injections to controller, services, factories, providers, filters
LoginController.$inject =  ['FirebaseService', '$scope'];

// Function defining LoginController
function LoginController(FirebaseService, $scope) {
	var self = this;

	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com/wx/");
	this.SignIn = function(e) {	
		e.preventDefault();
		var username = self.user.email;
		var password = self.user.password;
		FirebaseService.login(username, password, $scope, self);
	} 
}

// Function defining FirebaseService
// input : None
function FirebaseService(){
	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com/wx/");

	this.login = function(username, password, $scope, callback){
		firebaseObj.authWithPassword({
				email    : username,
				password : password
			}, function(err, authData) {
				if (err){
					console.log(err);
				} else {
					//Success callback
		                        console.log('Authentication successful');
                		        // set cookie
					$scope.success = true;
		                        document.cookie="username="+username+"; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
                		        // redirect to home
		                        location = "#home";	
				}
			}
		);
	};
}

})(); // END IIFE
