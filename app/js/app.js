
'use strict';

var app = angular.module('firefliesApp', []);

app.controller('MainCtrl', function($scope) {
	$scope.quote = 'Hello, World!';
	$scope.author = 'Brian Kernighan';
});
