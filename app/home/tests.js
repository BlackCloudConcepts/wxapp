describe('Controller: HomeCtrl', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('myApp.home'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, FirebaseServiceFeed, $rootScope) {	
		$scope = $rootScope.$new();

		// service
		spyOn(FirebaseServiceFeed, 'getOnce').and.callFake(function() {
     			return {'success':'1'};
    		});
		service = FirebaseServiceFeed;	

		ctrl = $controller('HomeCtrl', {$scope: $scope, FirebaseServiceFeed:service});

		// controller
		spyOn(ctrl, 'testCookie').and.callFake(function(){
			return true;
		});

	}));

	it('should have a Controller', function(){
		expect(ctrl).not.toEqual(undefined);
	});

	it('should have these in existance', function(){
		expect(service).not.toEqual(undefined);
		expect(service.feed).not.toEqual(undefined);
		expect(service.getOnce).not.toEqual(undefined);
	});

	it('should have called service feed', function(){
		spyOn(service, 'feed');	
		service.feed(undefined, ctrl);
		expect(service.feed).toHaveBeenCalled();
	});

	it('should have called service getOnce', function(){
		service.getOnce();
		expect(service.getOnce).toHaveBeenCalled();
	});

});

