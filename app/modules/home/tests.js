describe('Controller: HomeController', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('wxApp.modules.home'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, FirebaseFeedService, $rootScope) {	
		$scope = $rootScope.$new();

		// service
		spyOn(FirebaseFeedService, 'feed').and.callFake(function() {
     			return "success";
    		});
		service = FirebaseFeedService;	

		ctrl = $controller('HomeController', {$scope: $scope, FirebaseFeedService:service});

		// controller
		spyOn(ctrl, 'testCookie').and.callFake(function(){
			return true;
		});

	}));

	it('should have a Controller', function(){
		expect(ctrl).not.toEqual(undefined);
		expect(ctrl.testCookie).not.toEqual(undefined);
		expect(ctrl.switchRegion).not.toEqual(undefined)
	});

	it('should have a service', function(){
		expect(service).not.toEqual(undefined);
		expect(service.feed).not.toEqual(undefined);
	});

	it('should have called service feed', function(){
	//	spyOn(service, 'feed');	
		service.feed(undefined, ctrl);
		expect(service.feed).toHaveBeenCalled();
	});

});

