(function() {
  'use strict';

  angular
    .module('fireflies.background')
    .directive('firefliesBackground', firefliesBackground);

  function firefliesBackground() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/background/background.directive.html',
      controller: 'ImageController',
      controllerAs: 'vm'
    };
    return directive;
  }
})();
