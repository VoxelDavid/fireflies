
'use strict';

app.factory('Quote', function() {
	var Quote = {
		getRandom: function(json) {
			var quoteArray = json.data.quotes,

			    i = randomArrayIndex(quoteArray),
			    randomQuote = quoteArray[i],

			    j = randomArrayIndex(randomQuote.quote_list),
			    randomQuoteListObj = randomQuote.quote_list[j],

			    author = randomQuote.author,
			    quote = randomQuoteListObj.text,
			    quoteSource,
			    quoteTitle;

				if (randomQuote.hasOwnProperty('title')) {
					quoteTitle = randomQuote.title;
				}

				if (randomQuoteListObj.hasOwnProperty('source')) {
					quoteSource = randomQuoteListObj.source;
				}

			return {
				author: author,
				quote: quote,
				source: quoteSource,
				title: quoteTitle
			};
		}
	};

	function randomArrayIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	return Quote;
});
