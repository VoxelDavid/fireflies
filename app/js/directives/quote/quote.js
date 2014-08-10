'use strict';

app.directive('firefliesQuote', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/directives/quote/quote.html',
    controller: 'QuoteController',
    controllerAs: 'quote'
  }
});
