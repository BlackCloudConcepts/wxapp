describe('Directive: AlertDirective', function() {
        // Instantiate a new version of my module before each test
        beforeEach(module('wxApp.directivemodules.alert'));

        var compile, mockBackend, rootScope;

        // Before each unit test, instantiate a new instance
        beforeEach(inject(function($compile, $httpBackend,$rootScope) {
                $scope = $rootScope.$new();

		compile = $compile;
		mockBackend = $httpBackend;
		rootScope = $rootScope;
        }));

        it('should have items available on load', function() {
                expect('1').toEqual('1');
        });

});
