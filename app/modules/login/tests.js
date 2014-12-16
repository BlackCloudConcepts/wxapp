describe('Controller: LoginCtrl', function() {
  	// Instantiate a new version of my module before each test
  	beforeEach(module('myApp.login'));

  	var ctrl, scope, service;

  	// Before each unit test, instantiate a new instance
  	// of the controller

	beforeEach(inject(function($controller, FirebaseService, $rootScope) {	
		$scope = $rootScope.$new();
//		$scope = {};
		serivce = FirebaseService;	
		ctrl = $controller('LoginCtrl', {$scope: $scope, FirebaseService:service});
	}));

  	it('should have items available on load', function() {
    		expect(ctrl.messages).toEqual('middle');
  	});

/*
	it('should be able to sign in', function(){
		ctrl.user = {};
		ctrl.user.email = "whatever@gmail.com";
		ctrl.user.password = 'letmein';
		ctrl.SignIn();
		setTimeout(function(){
console.log(ctrl.success);
			expect(ctrl.success).toEqual(true);
		},3000);
	});
*/
});







