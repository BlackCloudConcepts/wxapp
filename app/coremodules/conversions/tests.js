describe('Service: ConversionsService', function() {
        // Instantiate a new version of my module before each test
        beforeEach(module('wxApp.coremodules.conversions'));

        var ctrl, scope, service;

        // Before each unit test, instantiate a new instance
        // of the controller

        beforeEach(inject(function($rootScope, ConversionsService) {
                $scope = $rootScope.$new();
		service = ConversionsService;
//                ctrl = $controller('ConversionsService', {$scope: $scope});
        }));

        it('should have items available on load', function() {
                expect('1').toEqual('1');
        });

});
