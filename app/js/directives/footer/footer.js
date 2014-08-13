(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesFooter', firefliesFooter);

  function firefliesFooter() {
    return {
      restrict: 'E',
      templateUrl: '/js/directives/footer/footer.html'
    };
  }
})();
