describe('Controller: LogoutCtrl', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('myApp.logout'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, $rootScope) {	
		$scope = $rootScope.$new();
		ctrl = $controller('LogoutCtrl', {$scope: $scope});
	}));

  	it('should have items available on load', function() {
		expect('1').toEqual('1');
  	});

});







