(function() {
  'use strict';

  // Allows us to work with StellarJS from within the app.

  angular
    .module('fireflies')
    .factory('stellar', stellar);

  function stellar() {
    return function(options) {
      return angular.element.stellar(options);
    };
  }
})();
