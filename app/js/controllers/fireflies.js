
'use strict';

app.controller('FirefliesCtrl', function($scope, $sanitize, Data, Quote, Background) {
	Data.then(function(json) {
		var quoteData = Quote.getRandom(json),
		    imageData = Background.getRandom(json);

		// Quote and author are applied via the ng-bind-html directive,
		// which uses $sanitize the preserve html tags and entities.
		$scope.quote  = quoteData.quote;
		$scope.author = quoteData.author;
		$scope.source = quoteData.source;
		$scope.title  = quoteData.title;
	});
});
