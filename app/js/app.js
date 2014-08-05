
'use strict';

var app = angular.module('firefliesApp', [
  'ngRoute',
  'ngSanitize'
]);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider
    /* With this enabled, the url will appear as www.example.com/, without
     * the #/ at the end. This is only used right now because there's only
     * one view.
     *
     * Once there are more I believe rewrite rules need to be written, or
     * manually typing a view will result in a 404. */
    .html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'js/views/quote.html'
    })
    .otherwise({ redirectTo: '/' });
});
