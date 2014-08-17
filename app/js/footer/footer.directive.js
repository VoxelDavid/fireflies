(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesFooter', firefliesFooter);

  function firefliesFooter() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/footer/footer.directive.html'
    };
    return directive;
  }
})();
