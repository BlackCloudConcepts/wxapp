'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.es6', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/es6', {
        templateUrl: 'modules/es6/es6.html'
    });
}])
 
// Define controller, services, factories, providers, filters
.controller('Es6Controller', Es6Controller);

// Dependency injections to controller, services, factories, providers, filters
Es6Controller.$inject =  ['$scope'];

// -- Function defining Es6Controller
// input : scope
function Es6Controller($scope) {
	var self = this;

	self.output = [];

	
	// let
	for (let i = 0;i < 10;i++){
		self.output.push(i);
	}


	// generators / yield
	run();

	function run() {
	  	var iterator = onetofive();
	  	var obj = {};
	  	// Assuming obj.done is a boolean
	  	while (!obj.done) {
	    		obj = iterator.next();
			self.output.push(obj);
	  	}
	}

	function* onetofive() {
	  	yield 1;
	  	yield 2;
	  	yield 3;
	  	yield 4;
	  	return 5;
	}

}

})(); // END IIFE
