
'use strict';

var app = angular.module('firefliesApp', [
	'ngRoute',
	'ngSanitize'
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/views/index.html'
		})
		.otherwise({ redirectTo: '/' });
});
