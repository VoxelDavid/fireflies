
'use strict';

app.factory('Quote', function() {
	var Quote = {
		getRandom: function(json) {
			var quoteArray = json.data.quotes,

			    i = randomArrayIndex(quoteArray),
			    randomQuote = quoteArray[i],

			    j = randomArrayIndex(randomQuote.quote_list),
			    randomQuoteListObj = randomQuote.quote_list[j],

			    quote = randomQuoteListObj.text,
			    quoteAuthor = randomQuote.author,
			    quoteSource,
			    quoteTitle;

			if (randomQuoteListObj.hasOwnProperty('source')) {
				quoteSource = randomQuoteListObj.source;
			}

			if (randomQuote.hasOwnProperty('title')) {
				quoteTitle = randomQuote.title;
			}

			return {
				quote: quote,
				author: quoteAuthor,
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
