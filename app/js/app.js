
'use strict';

var app = angular.module('firefliesApp', [
	'ngRoute',
	'ngSanitize'
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'FirefliesCtrl'
		});
});
