"use strict";

var _slice = Array.prototype.slice;
var _slicedToArray = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else {
    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  }
};

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

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

    // ECMAScript6 feature and support list
    // http://kangax.github.io/compat-table/es6/

    // let
    self.outputLet = [];
    self.outputLet.push("-- let / block scoping --");
    console.log("-- Let / Block Scoping Logging --");
    for (var i = 0; i < 4; i++) {
      self.outputLet.push(i);
    }

    // generators / yield
    self.outputGenerator = [];
    self.outputGenerator.push("-- generator / yield --");
    console.log("-- Generator / Yield Logging --");
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
    console.log("-- Arrow Function / This Logging --");
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
    console.log("-- Classes Logging --");
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
    console.log("-- Set Logging --");
    var collection = new Set([]);
    collection.add("Chicago Cubs");
    collection.add("New York Yankees");
    collection.forEach(function (arg) {
      self.outputSet.push(arg);
    });
    var entries = collection.entries();
    var entry = entries.next();
    while (!entry.done) {
      self.outputSet.push("Entry: " + entry.value[0]);
      entry = entries.next();
    }
    var values = collection.values();
    var value = values.next();
    while (!value.done) {
      self.outputSet.push("Value: " + value.value);
      value = values.next();
    }
    //	collection.clear();
    collection["delete"]("Chicago Cubs");
    console.log(collection.has("Chicago Cubs"));
    console.log(collection.has("New York Yankees"));
    collection.forEach(function (args) {
      console.log(args);
    });

    // weakset
    self.outputWeakset = [];
    self.outputWeakset.push("-- weakset --");
    console.log("-- Weakset Logging --");

    // http://www.sitepoint.com/preparing-ecmascript-6-map-weakmap/
    // map
    self.outputMap = [];
    self.outputMap.push("-- map --");
    console.log("-- Map Logging --");
    var arrMap = [["Chicago", "Cubs"], ["New York", "Yankees"]];
    var mapTeams = new Map(arrMap);
    mapTeams.set("Boston", "Red Sox");
    self.outputMap.push(mapTeams.get("Boston"));
    self.outputMap.push(mapTeams.get("Chicago"));
    mapTeams["delete"]("New York");
    console.log(mapTeams.has("New York"));
    console.log(mapTeams.has("Chicago"));
    mapTeams.forEach(function (value, key) {
      console.log(value);
    });
    var teamEntries = mapTeams.entries();
    var teamEntry = teamEntries.next();
    while (!teamEntry.done) {
      console.log(teamEntry.value[1]);
      teamEntry = teamEntries.next();
    }
    var teamValues = mapTeams.values();
    var teamValue = teamValues.next();
    while (!teamValue.done) {
      console.log(teamValue.value);
      teamValue = teamValues.next();
    }

    // weakmap
    self.outputWeakmap = [];
    self.outputWeakmap.push("-- weakmap --");
    console.log("-- Weakmap Logging --");

    // http://www.2ality.com/2013/07/es6-modules.html
    // modules
    self.outputModules = [];
    self.outputModules.push("-- modules --");
    console.log("-- Modules Logging --");

    // promises
    // - race - resolves when one of the promises in iterable resolves
    // - all - resolves when all of the promises in iterable have resolved
    self.outputPromises = [];
    self.outputPromises.push("-- promises --");
    console.log("-- Promises Logging --");
    var myPromise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("Los Angeles Dodgers");
        //			reject('FAIL');
      }, 2000);
    });
    myPromise.then(function (val) {
      self.outputPromises.push(val);
    }, function (val) {
      self.outputPromises.push(val);
    });
    myPromise["catch"](function (val) {
      self.outputPromises.push("Error: " + val);
    });

    // proxy
    self.outputProxy = [];
    self.outputProxy.push("-- proxy (supported in FF) --");
    console.log("-- Proxy Logging --");
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      var proxyObj = { sport: "baseball", team: "Chicago Cubs", id: 21 };
      var interceptor = {
        // setter adds 1 to the id every time its set
        set: function (receiver, property, value) {
          value++;
          receiver[property] = value;
        },
        // getter changes the team name every time its called
        get: function (target, name) {
          target.team = "Los Angeles Dodgers";
          return target[name];
        }
      };
      proxyObj = new Proxy(proxyObj, interceptor);
      proxyObj.id = 13;
      console.log("Proxy:" + proxyObj.team + ":" + proxyObj.id);
    }

    //reflect
    self.outputReflect = [];
    self.outputReflect.push("-- reflect (supported in FF) --");
    console.log("-- Reflect Logging --");
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      var reflectObj = { sport: "baseball", team: "Chicago Cubs", id: 21 };
      var handler = Proxy(reflectObj, {
        get: function (target, trapName, receiver) {
          target.team = "New York Yankees";
          return Reflect[trapName];
        }
      });
      var reflectObj = Proxy(reflectObj, handler);
      console.log("Reflect:" + reflectObj.team + ":" + reflectObj.id);
    }

    // symbols https://leanpub.com/understandinges6/read/#leanpub-auto-symbols
    self.outputSymbols = [];
    self.outputSymbols.push("-- symbols --");
    console.log("-- Symbols Logging --");
    var myTeamKey = Symbol("baseball team key");
    var team = {};
    team[myTeamKey] = 21;
    //	console.log(team);
    self.outputSymbols.push(team[myTeamKey]);
    //	console.log(myTeamKey);
    //	Object.defineProperty(team, myTeamKey, {writable:false});
    //	team[myTeamKey] = 28;
    //	console.log(team[myTeamKey]);

    // templates
    self.outputTemplates = [];
    self.outputTemplates.push("-- templates --");
    console.log("-- Templates Logging --");

    // destructuring
    self.outputDestructuring = [];
    self.outputDestructuring.push("-- destructuring --");
    console.log("-- Destructuring Logging --");
    var myArr = [1, 2, 3];
    var _ref = _slicedToArray(myArr, 3);

    var one = _ref[0];
    var two = _ref[1];
    var three = _ref[2];
    self.outputDestructuring.push(one);
    self.outputDestructuring.push(two);
    self.outputDestructuring.push(three);
    var myObj = { item1: 4, item2: 5, item3: 6 };
    var a = myObj.item1;
    var b = myObj.item2;
    var c = myObj.item3;
    self.outputDestructuring.push(a);

    // default
    self.outputDefault = [];
    self.outputDefault.push("-- default --");
    console.log("-- Default Logging --");
    var defaultFunction = function (x, y) {
      if (y === undefined) y = 3;
      self.outputDefault.push(x);
      self.outputDefault.push(y);
    };
    defaultFunction(12);

    // rest
    self.outputRest = [];
    self.outputRest.push("-- rest --");
    console.log("-- Rest Logging --");
    var restFunction = function (x) {
      var y = _slice.call(arguments, 1);

      var total = 0;
      total += x;
      for (var _iterator = y[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var i = _step.value;
        total += i;
      }

      self.outputRest.push(total);
    };
    restFunction(1, 2, 3, 4, 5);

    // spread
    self.outputSpread = [];
    self.outputSpread.push("-- spread --");
    console.log("-- Spread Logging --");
    var spreadValues = [1, 4, 6, 3];
    var spreadMax = Math.max.apply(Math, _toArray(spreadValues));
    self.outputSpread.push(spreadMax);
  }
})(); // END IIFE