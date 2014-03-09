
'use strict';

var app = angular.module('firefliesApp', [
	'ngRoute',
	'ngSanitize'
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/views/index.html',
			controller: 'FirefliesCtrl'
		})
		.when('/about', {
			templateUrl: 'js/views/about.html'
		})
		.otherwise({ redirectTo: '/' });
});
