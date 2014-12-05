describe('Controller: LogoutCtrl', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('myApp.logout'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, $rootScope) {	
		$scope = $rootScope.$new();
//		$scope = {};
//		serivce = FirebaseServiceFeed;	
		ctrl = $controller('LogoutCtrl', {$scope: $scope});
	}));

  	it('should have items available on load', function() {
		expect('1').toEqual('1');
//    		expect(ctrl.messages).toEqual('middle');
  	});

/*
	it('should be able to sign in', function(){
		ctrl.user = {};
		ctrl.user.email = "blackcloudconcepts@gmail.com";
		ctrl.user.password = 'blackcloud';
		ctrl.SignIn();
		setTimeout(function(){
console.log(ctrl.success);
			expect(ctrl.success).toEqual(true);
		},3000);
	});
*/
});







