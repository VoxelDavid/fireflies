(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesQuote', firefliesQuote);

  function firefliesQuote() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/directives/quote/quote.directive.html',
      controller: 'QuoteController',
      controllerAs: 'quote'
    };
    return directive;
  }
})();
