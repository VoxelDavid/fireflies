(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesQuote', firefliesQuote);

  function firefliesQuote() {
    return {
      restrict: 'E',
      templateUrl: '/js/directives/quote/quote.html',
      controller: 'QuoteController',
      controllerAs: 'quote'
    }
  }
})();
