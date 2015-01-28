'use strict';
(function(){ // START IIFE

    angular.module('wxApp.modules.nested', ['ngResource'])

    // Declared route 
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/nested', {
            templateUrl: 'modules/nested/nested.html'//,
            //        controller: 'HomeCtrl' (removed since the html was also referencing the controller causing it to happen twice)
        });
    }])

    // Define controller, services, factories, providers, filters
    .controller('NestedMainController', NestedMainController)
    .controller('NestedController', NestedController)
    .controller('Nested2Controller', Nested2Controller);

    // Dependency injections to controller, services, factories, providers, filters
    NestedMainController.$inject =  ['$scope', '$rootScope'];
    NestedController.$inject =  ['$scope', '$rootScope', '$resource'];
    Nested2Controller.$inject =  ['$scope', '$rootScope', '$http'];

    // Sharing models between nested controllers
    // - http://fdietz.github.io/recipes-with-angular-js/controllers/sharing-models-between-nested-controllers.html
    // Broadcast, emit, on
    // - http://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/
    // - http://www.objectpartners.com/2013/08/21/using-services-and-messages-to-share-data-between-controllers-in-angularjs/
    function NestedMainController($scope, $rootScope) {
        $scope.mainname = "main";

        // broadcast a message "down" from the parent to the child
        setTimeout(function(){
            $scope.$broadcast('parenttochildmessage', {message:'from parent to child'});
        }, 2000);

        // listen "on" the parent for a message from the child
        $scope.$on('childtoparentmessage', function(event, args){
            console.log(args);
        });
    }

    function NestedController($scope, $rootScope, $resource) {
        var self = this;
        $scope.nestedname = "nested";

        // listen "on" the child for a message "broadcast" from the parent
        $scope.$on('parenttochildmessage', function(event, args){
            console.log(args);
        });

        $scope.$emit('childtoparentmessage', {message:'from child to parent'});

        // listen "on" the rootScope for a message
        $rootScope.$on('siblingmessage', function(event, args){
            console.log(args);
        });

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

    function Nested2Controller($scope, $rootScope, $http) {
        var self = this;
        this.infoData = [];	

        // "emit" or "broadcast" a message on the rootScope
        // - emit will send message only on rootScope
        // - broadcast will send message on rootScope as well as scope
        // - http://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/
        $rootScope.$emit('siblingmessage', {message:'hello from your sibling'});

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

})(); // END IIFE
