'use strict';
(function(){ // START IIFE

    angular.module('wxApp.modules.templating', ['ngRoute', 'ngResource', 'restangular', 'ui.grid'])

    // Declared route 
    .config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
        $routeProvider.when('/templating', {
            templateUrl: 'modules/templating/templating.html'//,
            //        controller: 'HomeCtrl' (removed since the html was also referencing the controller causing it to happen twice)
        });
        RestangularProvider.setBaseUrl('http://96.126.120.64:8126');
        RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
    }])
    // Define controller, services, factories, providers, filters
    .controller('TemplatingController', TemplatingController)
    .controller('HttpController', HttpController)
    .controller('NgResourceController', NgResourceController)
    .controller('RestangularController', RestangularController);

    // Dependency injections to controller, services, factories, providers, filters
    TemplatingController.$inject =  ['$scope'];
    HttpController.$inject =  ['$scope', '$http'];
    NgResourceController.$inject =  ['$scope', '$resource'];
    RestangularController.$inject = ['$scope', 'Restangular'];

    function TemplatingController($scope) {
        $scope.templates = [
            {
                name: 'http',
                url: 'modules/templating/http.html'
            },
            {
                name: 'ngresource',
                url: 'modules/templating/ngresource.html'
            },
            {
                name: 'restangular',
                url: 'modules/templating/restangular.html'
            }
        ];
        $scope.template = $scope.templates[0];

        $scope.switchToHttp = function() {
            $scope.template = $scope.templates[0];
        };
        $scope.switchToNgResource = function() {
            $scope.template = $scope.templates[1];
        };
        $scope.switchToRestangular = function() {
            $scope.template = $scope.templates[2];
        };
    }

    function HttpController($scope, $http){
        var self = this;
        $scope.name = "You are viewing template Http";

        // sample data call using $http
        this.getData = function(){
            $http.jsonp('http://96.126.120.64:8126/?action=find&collection=info&callback=JSON_CALLBACK')
                .success(function(data, status, headers, config) {
                    self.infoData = data.data;
                })
                .error(function(data, status, headers, config) {
                    console.log('ERROR');
                });
        };        
    }

    function NgResourceController($scope, $resource){
        var self = this;
        $scope.name = "You are viewing template NgResource";

        // sample data call using $resource
        this.getData = function(){
            var infoResource = $resource('http://96.126.120.64:8126', {action:'find',collection:'info', callback:'JSON_CALLBACK'},
                {
                    request :{
                        method: 'JSONP'
                    }
                }
            );
            infoResource.request().$promise.then(
                function(data){
                    self.infoData = data.data;
                },
                function(err){
                    console.log(err);
                }
            );
        };

    }

    function RestangularController($scope, Restangular){
        var self = this;
        $scope.name = "You are viewing template Restangular";

        // sample data call using restangular
        this.getData = function(){
            Restangular.setJsonp(true);
            var baseInfo = Restangular.one('?action=find&collection=info');
            baseInfo.get().then(function(data) {
                self.infoData = data.data;
            });
            
        };
    }


})(); // END IIFE
