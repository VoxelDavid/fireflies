
'use strict';

app.controller('FirefliesCtrl', function($scope, Data, Quote, Photo) {
	Data.then(function(json) {
		var quoteData = Quote.getRandom(json);

		$scope.quote = quoteData.quote;
		$scope.author = quoteData.author;
	});
});
