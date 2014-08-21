(function() {
  'use strict';

  angular
    .module('fireflies.quote')
    .directive('firefliesQuote', firefliesQuote);

  function firefliesQuote() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/quote/quote.directive.html',
      controller: 'QuoteController',
      controllerAs: 'vm'
    };
    return directive;
  }
})();
