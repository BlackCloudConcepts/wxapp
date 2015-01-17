"use strict";
(function () {
  // START IIFE

  angular.module("wxApp.coremodules.tools", []).service("ToolsService", ToolsService);
  ToolsService.$inject = [];

  function ToolsService() {
    // -- sorting by object attribute
    // input : array of objects , attribute to sort by
    // output : sorted array of objects
    this.sortByAttribute = function (arrObj, attr, order) {
      if (order == "asc") arrObj = arrObj.sort(compareAsc);
      if (order == "desc") arrObj = arrObj.sort(compareDesc);
      return arrObj;

      function compareAsc(a, b) {
        if (a[attr] < b[attr]) return -1;
        if (a[attr] > b[attr]) return 1;
        return 0;
      }

      function compareDesc(a, b) {
        if (a[attr] < b[attr]) return 1;
        if (a[attr] > b[attr]) return -1;
        return 0;
      }
    };

    // -- find perpendicular line between two coordinate points
    // input : 2 points defining a line
    // output : 2 points defining a perpendicular line
    this.getPerpendicularLine = function (pointA, pointB) {
      var distPoint = 0.15;

      var latDiff = pointB.lat - pointA.lat;
      var longDiff = pointB.lon - pointA.lon;
      var length = Math.sqrt(latDiff * latDiff + longDiff * longDiff);

      var uLat = latDiff / length;
      var uLong = longDiff / length;

      var newLat1 = (pointA.lat + pointB.lat) / 2 + distPoint / 2 * uLong;
      var newLong1 = (pointA.lon + pointB.lon) / 2 - distPoint / 2 * uLat;

      var newLat2 = (pointA.lat + pointB.lat) / 2 - distPoint / 2 * uLong;
      var newLong2 = (pointA.lon + pointB.lon) / 2 + distPoint / 2 * uLat;
      return {
        pointA: {
          lat: newLat1,
          lon: newLong1
        },
        pointB: {
          lat: newLat2,
          lon: newLong2
        }
      };
    };
  }
})(); // END IIFE