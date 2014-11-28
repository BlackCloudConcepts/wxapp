'use strict';
(function(){ // START IIFE

angular.module('myApp.login', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html'
    });
}])
 
// Login controller
//.controller('HomeCtrl', ['FirebaseService', '$scope', '$firebaseSimpleLogin', FirebaseLoginController])
.controller('LoginCtrl', FirebaseLoginController)
.service('FirebaseService', ['$firebaseSimpleLogin', FirebaseService]);

FirebaseLoginController.$inject =  ['FirebaseService', '$scope', '$firebaseSimpleLogin'];

function FirebaseLoginController(FirebaseService, $scope, $firebaseSimpleLogin) {
	var self = this;
	this.messages = "start";
	this.messages = "middle";
	setTimeout(function(){ 
		$scope.$apply(function(){ // this forces the UI to refresh
			self.messages = "end"; 
		});
	}, 3000);
	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(firebaseObj);
	this.SignIn = function(e) {	
		e.preventDefault();
		var username = self.user.email;
		var password = self.user.password;
		FirebaseService.login(username, password, $scope, self);
	} 
}

function FirebaseService($firebaseSimpleLogin){
	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(firebaseObj);

	// public functions
	this.login = function(username, password, $scope, callback){
		loginObj.$login('password', {
			email: username,
			password: password
		    })
		    .then(function(user) {
			//Success callback
			console.log('Authentication successful');
			// set cookie
			document.cookie="username="+username+"; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
			// redirect to home
			location = "#home";
		    }, function(error) {
			//Failure callback
			console.log('Authentication failure');
		    });
	}
}

})(); // END IIFE
