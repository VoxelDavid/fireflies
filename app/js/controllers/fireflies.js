
'use strict';

app.controller('FirefliesCtrl', function($scope, $sanitize, Data, Quote, Photo) {
	Data.then(function(json) {
		var quoteData = Quote.getRandom(json);

		// Quote text and author must be sanitized and applied to elements
		// with the 'ng-bind-html' directive, as they can contain html tags
		// and entities.
		$scope.quote = $sanitize(quoteData.quote);
		$scope.author = $sanitize(quoteData.author);
	});
});
