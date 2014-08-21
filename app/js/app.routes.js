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
          return dataservice.getQuote();
        },
        imagePrepService: function(dataservice) {
          return dataservice.getImage();
        }
      }
    };

    $routeProvider
      .when('/', homepage)
      .otherwise({ redirectTo: '/' });
  }
})();
