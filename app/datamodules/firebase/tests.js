describe('Service: FirebaseDataService', function() {
        // Instantiate a new version of my module before each test
        beforeEach(module('wxApp.datamodules.firebase'));

        var ctrl, scope, service;

        // Before each unit test, instantiate a new instance
        // of the controller

        beforeEach(inject(function($rootScope, FirebaseDataService) {
                $scope = $rootScope.$new();
		service = FirebaseDataService;
//                ctrl = $controller('FirebaseDataService', {$scope: $scope});
        }));

        it('should have items available on load', function() {
                expect('1').toEqual('1');
        });

});
