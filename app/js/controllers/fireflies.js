
'use strict';

app.controller('FirefliesCtrl', function($scope, $sanitize, Data, Quote, Photo) {
	Data.then(function(json) {
		var quoteData = Quote.getRandom(json);

		// Quote and author are applied via the ng-bind-html directive,
		// which uses $sanitize the preserve html tags and entities.
		$scope.quote = quoteData.quote;
		$scope.author = quoteData.author;
		$scope.source = quoteData.source;
		$scope.title = quoteData.title;
	});
});
