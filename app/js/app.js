
'use strict';

var app = angular.module('firefliesApp', [
	'ngRoute'
]);

app.controller('MainCtrl', function($scope) {
	$scope.quote = 'Hello, World!';
	$scope.author = 'Brian Kernighan';
});

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'MainCtrl'
		})
});
