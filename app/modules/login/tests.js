describe('Controller: LoginController', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('wxApp.modules.login'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, FirebaseService, $rootScope) {	
		$scope = $rootScope.$new();
		service = FirebaseService;	
		ctrl = $controller('LoginController', {FirebaseService:service, $scope: $scope});
	}));

  	it('should have a controller with appropriate functions', function() {
    		expect(ctrl).not.toEqual(undefined);
		expect(ctrl.SignIn).not.toEqual(undefined);
  	});

	it('should have a service with appropriate functions', function(){
		expect(service).not.toEqual(undefined);
		expect(service.login).not.toEqual(undefined);
	});

});







