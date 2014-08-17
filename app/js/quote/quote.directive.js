(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesQuote', firefliesQuote);

  function firefliesQuote() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/quote/quote.directive.html'
    };
    return directive;
  }
})();
