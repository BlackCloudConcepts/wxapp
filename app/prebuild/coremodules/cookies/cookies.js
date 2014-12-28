"use strict";
(function () {
  // START IIFE

  angular.module("wxApp.coremodules.cookies", []).service("CookiesService", CookiesService);
  CookiesService.$inject = [];

  function CookiesService() {
    // -- generic function for dealing with cookie rerieval
    // // input : cookie name
    // // output : cookie value
    this.getCookie = function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    };
  }
})(); // END IIFE