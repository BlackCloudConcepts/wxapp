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
  }
})(); // END IIFE