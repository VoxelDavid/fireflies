(function() {
  'use strict';

  angular
    .module('fireflies')
    .directive('firefliesQuote', firefliesQuote);

  function firefliesQuote() {
    var directive = {
      restrict: 'E',
      templateUrl: '/js/directives/quote/quote.html',
      controller: 'QuoteController',
      controllerAs: 'quote'
    };
    return directive;
  }
})();
