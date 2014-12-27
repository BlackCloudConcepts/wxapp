'use strict';
(function(){ // START IIFE

angular.module('wxApp.directivemodules.search',[])
.directive('bcSearch', SearchDirective);

SearchDirective.$inject = [];

function SearchDirective(){
	return {
		templateUrl: 'directivemodules/search/search.html',
		restrict:'E',
		scope: {
			searchText: '=',
			placeholder: '@',
			buttonText: '@',
			clearText: '@'
		},
		link: function(scope, element, attrs){
			scope.searchClicked = function(){
//				scope.searchText = scope.tempSearchText;
				scope.$parent.ctrl.searchText = scope.tempSearchText;
			};
			scope.clearClicked = function(){
				scope.$parent.ctrl.searchText = "";
				scope.tempSearchText = "";
			};
		}
	};
}

})(); // END IIFE
