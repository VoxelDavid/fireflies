
'use strict';

app.factory('Quote', function() {
	var Quote = {
		getRandom: function(json) {
			var quoteArray = json.data.quotes,

			    i = randomArrayIndex(quoteArray),
			    randomQuote = quoteArray[i],

			    j = randomArrayIndex(randomQuote.quote_list),
			    randomQuoteListObj = randomQuote.quote_list[j];

			var quoteData = {
				quote: randomQuoteListObj.text,
				author: randomQuote.author
			};

			if (!quoteData.author) {
				quoteData.author = 'Unknown';
			}

			if (randomQuoteListObj.hasOwnProperty('source')) {
				quoteData.source = randomQuoteListObj.source;
			}

			if (randomQuote.hasOwnProperty('title')) {
				quoteData.title = randomQuote.title;
			}

			return quoteData;
		}
	};

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	return Quote;
});
