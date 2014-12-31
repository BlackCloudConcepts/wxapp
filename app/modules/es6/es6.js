'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.es6', ['ngRoute','wxApp.directivemodules.footer'])
 
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

	// let
	self.outputLet = [];
	self.outputLet.push('-- let / block scoping --');
	for (let i = 0;i < 4;i++){
		self.outputLet.push(i);
	}

	// generators / yield
	self.outputGenerator = [];
	self.outputGenerator.push('-- generator / yield --');
	runGenerator();
	function runGenerator() {
	  	var iterator = onetofive();
	  	var obj = {};
	  	// Assuming obj.done is a boolean
	  	while (!obj.done) {
	    		obj = iterator.next();
			self.outputGenerator.push(obj);
	  	}
	}
	function* onetofive() {
	  	yield 1;
	  	yield 2;
	  	return 5;
	}

	// arrow functions (eliminate the need for redefining this)
	self.outputArrow = [];
	self.outputArrow.push('-- arrow function / this --');
	let rA = new runArrow();
	function runArrow(){
		this.count = 109;
		self.outputArrow.push(this.count);
		setTimeout(() => {
			$scope.$apply(() => {
				this.count++;
				self.outputArrow.push(this.count);
			});
		},3000);
	}

	// classes
	self.outputClass = [];
	self.outputClass.push('-- classes --');
	class baseClass {
		constructor(){
			this.teams = {
				't1' : "Chicago Cubs",
				't2' : "New York Yankees"
			};
		}
		getName(id){
			return this.teams[id];
		}
	}
	class baseballClass extends baseClass {
		constructor(){
			super(); // calls the constructor of the base class
		}
		printBaseballTeam(id){
			self.outputClass.push(this.getName(id));
		}
	}
	let bObj = new baseballClass();
	bObj.printBaseballTeam('t1');

	// http://www.sitepoint.com/preparing-ecmascript-6-set-weakset/
	// set 
	self.outputSet = [];
	self.outputSet.push('-- set --');

	// weakset
	self.outputWeakset = [];
	self.outputWeakset.push('-- weakset --');

	// http://www.sitepoint.com/preparing-ecmascript-6-map-weakmap/
	// map
	self.outputMap = [];
	self.outputMap.push('-- map --');

	// weakmap
	self.outputWeakmap = [];
	self.outputWeakmap.push('-- weakmap --');
}

})(); // END IIFE
