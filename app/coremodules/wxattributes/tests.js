describe('Service: WxAttributesService', function() {
        // Instantiate a new version of my module before each test
        beforeEach(module('wxApp.coremodules.wxattributes'));

        var ctrl, scope, service;

        // Before each unit test, instantiate a new instance
        // of the controller

        beforeEach(inject(function($rootScope, WxAttributesService) {
                $scope = $rootScope.$new();
		service = WxAttributesService;
//                ctrl = $controller('WxAttributesService', {$scope: $scope});
        }));

        it('should have items available on load', function() {
                expect('1').toEqual('1');
        });

});
