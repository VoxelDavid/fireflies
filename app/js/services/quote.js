
'use strict';

var NO_AUTHOR = 'Unknown';

app.factory('Quote', function() {
  function randomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  function randomQuote(json) {
    var quoteData = json.data.quoteData,

        i = randomArrayIndex(quoteData),
        quoteMeta = quoteData[i],
        quoteList = quoteMeta.quotes,

        j = randomArrayIndex(quoteList),
        quoteObject = quoteList[j];

    return {
      meta: quoteMeta,
      data: quoteObject
    };
  }

  function getQuoteData(json) {
    var quote  = randomQuote(json),
        meta   = quote.meta,
        data   = quote.data,

        author = meta.author,
        title  = meta.title,
        source = data.source,
        text   = data.text;

    if (!author) {
      author = NO_AUTHOR;
    }

    return {
      author: author,
      title: title,
      source: source,
      text: text
    };
  }

  return getQuoteData;
});
