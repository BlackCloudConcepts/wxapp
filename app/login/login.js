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
//.controller('HomeCtrl', ['FirebaseService', '$scope', FirebaseLoginController])
.controller('LoginCtrl', FirebaseLoginController)
.service('FirebaseService', [FirebaseService]);

FirebaseLoginController.$inject =  ['FirebaseService', '$scope'];

function FirebaseLoginController(FirebaseService, $scope) {
	var self = this;
	this.messages = "start";
	this.messages = "middle";
	setTimeout(function(){ 
		$scope.$apply(function(){ // this forces the UI to refresh
			self.messages = "end"; 
		});
	}, 3000);
	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com/wx/");
	this.SignIn = function(e) {	
		e.preventDefault();
		var username = self.user.email;
		var password = self.user.password;
		FirebaseService.login(username, password, $scope, self);
	} 
}

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

/* // using simple login which is deprecated
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
*/
}

})(); // END IIFE
