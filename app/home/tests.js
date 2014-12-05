describe('Controller: HomeCtrl', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('myApp.home'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, FirebaseServiceFeed, $rootScope) {	
		$scope = $rootScope.$new();
		serivce = FirebaseServiceFeed;	
		ctrl = $controller('HomeCtrl', {$scope: $scope, FirebaseServiceFeed:service});
	}));

  	it('should have items available on load', function() {
		expect('1').toEqual('1');
  	});

});







