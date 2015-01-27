'use strict';


// Declare app level module which depends on filters, and services
angular.module('wxApp', [
  	'ngRoute',
	'wxApp.modules.login',
	'wxApp.modules.home',
	'wxApp.modules.logout',
	'wxApp.modules.es6',
	'wxApp.modules.footer',
	'wxApp.modules.nested',
	'wxApp.modules.templating',
  	'wxApp.filters',
  	'wxApp.services',
  	'wxApp.directives',
  	'wxApp.controllers',
	'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
