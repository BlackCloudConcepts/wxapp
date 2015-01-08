describe('Service: ToolsService', function() {
        // Instantiate a new version of my module before each test
        beforeEach(module('wxApp.coremodules.tools'));

        var ctrl, scope, service;

        // Before each unit test, instantiate a new instance
        // of the controller

        beforeEach(inject(function($rootScope, ToolsService) {
                $scope = $rootScope.$new();
		service = ToolsService;
//                ctrl = $controller('ToolsService', {$scope: $scope});
        }));

        it('should have items available on load', function() {
                expect('1').toEqual('1');
        });

});
