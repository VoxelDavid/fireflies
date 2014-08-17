(function() {
  'use strict';

  angular
    .module('fireflies')
    .config(config);

  function config($routeProvider) {
    var homepage = {
      controller: 'FirefliesController',
      controllerAs: 'vm',
      templateUrl: '/js/quote/quote.directive.html',
      resolve: {
        quotePrepService: function(dataService) {
          return dataService.randomQuote();
        },
        imagePrepService: function(dataService) {
          return dataService.randomImage();
        }
      }
    };

    $routeProvider
      .when('/', homepage)
      .otherwise({ redirectTo: '/' });
  }
})();
