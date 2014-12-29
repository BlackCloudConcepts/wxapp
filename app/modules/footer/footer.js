'use strict';
(function(){ // START IIFE

angular.module('wxApp.modules.footer', ['ngSanitize'])
 
// Define controller, services, factories, providers, filters
.controller('FooterController', FooterController);

// Dependency injections to controller, services, factories, providers, filters
FooterController.$inject =  ['$scope', '$sce'];

// -- Function defining FooterController
// input : scope
function FooterController($scope, $sce) {
	var self = this;
//	this.copyright = $sce.trustAsHtml("&copy; BlackCloudConcepts 2015");
	this.copyright = "&copy; BlackCloudConcepts 2015";
}

})(); // END IIFE
