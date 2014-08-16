(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesFooter', firefliesFooter);

  function firefliesFooter() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/directives/footer/footer.html'
    };
    return directive;
  }
})();
