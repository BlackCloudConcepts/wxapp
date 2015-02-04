'use strict';
(function(){ // START IIFE

    angular.module('wxApp.modules.templating', ['ngRoute', 'ngResource', 'restangular', 'ui.grid', 'ngAnimate'])

    // Declared route 
    .config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
        $routeProvider.when('/templating', {
            templateUrl: 'modules/templating/templating.html'//,
            //        controller: 'HomeCtrl' (removed since the html was also referencing the controller causing it to happen twice)
        });

        // set restangular defaults
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

    // restangular : https://github.com/mgonto/restangular#starter-guide
    // ui-grid : http://ui-grid.info/docs/#/tutorial/101_intro
    function RestangularController($scope, Restangular){
        var self = this;
        $scope.name = "You are viewing template Restangular";
        this.hideGrid = true;
        this.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                {
                    field: 'name',
                    filter: {
                        noTerm: false,
                        condition: function(searchTerm, cellValue) {
                            if (cellValue.indexOf(searchTerm) != -1)
                                return true;
                            else
                                return false;
                        },
                        placeholder: 'filter by name'
                    }
                },
                {
                    field: 'url',
                    filter: {
                        noTerm: false,
                        condition: function(searchTerm, cellValue) {
                            if (cellValue.indexOf(searchTerm) != -1)
                                return true;
                            else
                                return false;
                        },
                        placeholder: 'filter by url'
                    }
                }
            ]
        };

        // sample data call using restangular
        this.getData = function(){
            // defaults get and getList to use jsonp calls
            Restangular.setJsonp(true);
           
/*           
            // example using one / get 
            var baseInfo = Restangular.one('?action=find&collection=info');
            baseInfo.get().then(function(data) {
                self.gridOptions.data = data.data;
                self.hideGrid = false;
            });
*/

            // example extending model to format the output
            var baseInfo = Restangular.one('?action=find&collection=info');
            Restangular.extendModel("?action=find&collection=info", function(model) {
                model.createLink = function() {
                    for (var i = 0;i < model.data.length;i++){
                        model.data[i].url = model.data[i].url.replace('http://','').replace('https://','');
                    }
                };
                return model;
            });
            baseInfo.get().then(function(data) {
                data.createLink();
                self.gridOptions.data = data.data;
                self.hideGrid = false;
            });

/*
            // example using customGET
            var baseInfo = Restangular.all("").customGET("", {action: "find", collection: "info"});
            baseInfo.get("data").then(function(data) {
                self.gridOptions.data = data;
                self.hideGrid = false;
            });
*/            
        };
    }


})(); // END IIFE
