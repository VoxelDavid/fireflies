(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesInfo', firefliesInfo);

  function firefliesInfo() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/directives/siteInfo/siteInfo.directive.html'
    };
    return directive;
  }
})();
