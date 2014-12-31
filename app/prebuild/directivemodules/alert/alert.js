"use strict";
(function () {
  // START IIFE

  angular.module("wxApp.directivemodules.alert", []).directive("bcAlert", AlertDirective);

  AlertDirective.$inject = [];

  function AlertDirective() {
    return {
      templateUrl: "directivemodules/alert/alert.html",
      restrict: "E",
      scope: {
        alertMessage: "@",
        alertType: "@"
      },
      link: function (scope, element, attrs) {}
    };
  }
})(); // END IIFE