(function() {
  'use strict';

  angular
    .module('fireflies')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    var homepage = {
      controller: 'FirefliesController',
      controllerAs: 'vm',
      templateUrl: '/js/quote/quote.directive.html',
      resolve: {
        quotePrepService: function(dataservice) {
          return dataservice.getRandomQuote();
        },
        imagePrepService: function(dataservice) {
          return dataservice.getRandomImage();
        }
      }
    };

    $routeProvider
      .when('/', homepage)
      .otherwise({ redirectTo: '/' });
  }
})();
