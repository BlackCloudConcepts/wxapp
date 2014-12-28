"use strict";
(function () {
  // START IIFE

  angular.module("wxApp.modules.es6", ["ngRoute"])

  // Declared route
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/es6", {
      templateUrl: "modules/es6/es6.html"
    });
  }])

  // Define controller, services, factories, providers, filters
  .controller("Es6Controller", Es6Controller);

  // Dependency injections to controller, services, factories, providers, filters
  Es6Controller.$inject = ["$scope"];

  // -- Function defining Es6Controller
  // input : scope
  function Es6Controller($scope) {
    var onetofive = regeneratorRuntime.mark(function onetofive() {
      return regeneratorRuntime.wrap(function onetofive$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return 1;
          case 2:
            context$3$0.next = 4;
            return 2;
          case 4:
            context$3$0.next = 6;
            return 3;
          case 6:
            context$3$0.next = 8;
            return 4;
          case 8:
            return context$3$0.abrupt("return", 5);
          case 9:
          case "end":
            return context$3$0.stop();
        }
      }, onetofive, this);
    });

    var self = this;

    self.output = [];


    // let
    for (var i = 0; i < 10; i++) {
      self.output.push(i);
    }


    // generators / yield
    run();

    function run() {
      var iterator = onetofive();
      var obj = {};
      // Assuming obj.done is a boolean
      while (!obj.done) {
        obj = iterator.next();
        self.output.push(obj);
      }
    }
  }
})(); // END IIFE