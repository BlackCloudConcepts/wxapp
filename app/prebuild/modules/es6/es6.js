"use strict";

var _inherits = function (child, parent) {
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

"use strict";
(function () {
  // START IIFE

  angular.module("wxApp.modules.es6", ["ngRoute", "wxApp.directivemodules.footer"])

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
            return context$3$0.abrupt("return", 5);
          case 5:
          case "end":
            return context$3$0.stop();
        }
      }, onetofive, this);
    });

    var self = this;

    // let
    self.outputLet = [];
    self.outputLet.push("-- let / block scoping --");
    for (var i = 0; i < 4; i++) {
      self.outputLet.push(i);
    }

    // generators / yield
    self.outputGenerator = [];
    self.outputGenerator.push("-- generator / yield --");
    runGenerator();
    function runGenerator() {
      var iterator = onetofive();
      var obj = {};
      // Assuming obj.done is a boolean
      while (!obj.done) {
        obj = iterator.next();
        self.outputGenerator.push(obj);
      }
    }


    // arrow functions (eliminate the need for redefining this)
    self.outputArrow = [];
    self.outputArrow.push("-- arrow function / this --");
    var rA = new runArrow();
    function runArrow() {
      var _this = this;
      this.count = 109;
      self.outputArrow.push(this.count);
      setTimeout(function () {
        $scope.$apply(function () {
          _this.count++;
          self.outputArrow.push(_this.count);
        });
      }, 3000);
    }

    // classes
    self.outputClass = [];
    self.outputClass.push("-- classes --");
    var baseClass = function baseClass() {
      this.teams = {
        t1: "Chicago Cubs",
        t2: "New York Yankees"
      };
    };

    baseClass.prototype.getName = function (id) {
      return this.teams[id];
    };

    var baseballClass = function baseballClass() {
      baseClass.call(this); // calls the constructor of the base class
    };

    _inherits(baseballClass, baseClass);

    baseballClass.prototype.printBaseballTeam = function (id) {
      self.outputClass.push(this.getName(id));
    };

    var bObj = new baseballClass();
    bObj.printBaseballTeam("t1");

    // http://www.sitepoint.com/preparing-ecmascript-6-set-weakset/
    // set
    self.outputSet = [];
    self.outputSet.push("-- set --");

    // weakset
    self.outputWeakset = [];
    self.outputWeakset.push("-- weakset --");

    // http://www.sitepoint.com/preparing-ecmascript-6-map-weakmap/
    // map
    self.outputMap = [];
    self.outputMap.push("-- map --");

    // weakmap
    self.outputWeakmap = [];
    self.outputWeakmap.push("-- weakmap --");
  }
})(); // END IIFE