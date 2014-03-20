
'use strict';

app.factory('quote', function() {
  var quote = {
    getFrom: function(json) {
      var quote = this.getRandom(json),
          randomQuote = quote.quote,
          randomQuoteListObj = quote.quoteList;

      var quoteData = {
        quote: randomQuoteListObj.text,
        author: randomQuote.author
      };

      // Propagate the quoteData object.
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
    },

    getRandom: function(json) {
      var quoteArray = json.data.quotes,

          i = randomArrayIndex(quoteArray),
          randomQuote = quoteArray[i],

          j = randomArrayIndex(randomQuote.quoteList),
          randomQuoteListObj = randomQuote.quoteList[j];

      return {
        quote: randomQuote,
        quoteList: randomQuoteListObj
      };
    }
  };

  function randomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  return quote;
});
