(function() {
  'use strict';

  angular
    .module('fireflies', [
      'ngRoute',
      'ngSanitize',

      'fireflies.background',
      'fireflies.quote'
    ]);
})();
