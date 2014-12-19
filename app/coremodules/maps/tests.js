describe('Service: MapsService', function() {
        // Instantiate a new version of my module before each test
        beforeEach(module('wxApp.coremodules.maps'));

        var ctrl, scope, service;

        // Before each unit test, instantiate a new instance
        // of the controller

        beforeEach(inject(function($rootScope, MapsService) {
                $scope = $rootScope.$new();
		service = MapsService;
//                ctrl = $controller('MapsService', {$scope: $scope});
        }));

        it('should have items available on load', function() {
                expect('1').toEqual('1');
        });

});
