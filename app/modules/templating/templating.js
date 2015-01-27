'use strict';
(function(){ // START IIFE

    angular.module('wxApp.modules.templating', [])

    // Declared route 
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/templating', {
            templateUrl: 'modules/templating/templating.html'//,
            //        controller: 'HomeCtrl' (removed since the html was also referencing the controller causing it to happen twice)
        });
    }])

    // Define controller, services, factories, providers, filters
    .controller('MainController', MainController)
    .controller('OneController', OneController)
    .controller('TwoController', TwoController);

    // Dependency injections to controller, services, factories, providers, filters
    MainController.$inject =  ['$scope'];
    OneController.$inject =  ['$scope'];
    TwoController.$inject =  ['$scope'];

    function MainController($scope) {
        $scope.templates = [
            {
                name: 'one',
                url: 'modules/templating/one.html'
            },
            {
                name: 'two',
                url: 'modules/templating/two.html'
            }
        ];
        $scope.template = $scope.templates[0];

        $scope.switchToOne = function() {
            $scope.template = $scope.templates[0];
        };
        $scope.switchToTwo = function() {
            $scope.template = $scope.templates[1];
        };
    }

    function OneController($scope){
        $scope.name = "You are viewing template ONE";
    }

    function TwoController($scope){
        $scope.name = "You are viewing template TWO";
    }


})(); // END IIFE
