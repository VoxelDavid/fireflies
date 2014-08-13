(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesInfo', firefliesInfo);

  function firefliesInfo() {
    return {
      restrict: 'E',
      templateUrl: '/js/directives/siteInfo/siteInfo.html'
    };
  }
})();
