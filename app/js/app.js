
'use strict';

var app = angular.module('firefliesApp', [
	'ngRoute',
	'ngSanitize'
]);

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'FirefliesCtrl'
		});
});
