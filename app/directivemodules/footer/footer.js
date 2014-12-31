'use strict';
(function(){ // START IIFE

angular.module('wxApp.directivemodules.footer',[])
.directive('bcFooter', FooterDirective);

FooterDirective.$inject = [];

function FooterDirective(){
	return {
		templateUrl: 'directivemodules/footer/footer.html',
		restrict:'E',
		scope: {
		},
		link: function(scope, element, attrs){
		}
	};
}

})(); // END IIFE
