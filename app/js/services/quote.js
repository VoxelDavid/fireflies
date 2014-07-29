
'use strict';

var NO_AUTHOR = 'Unknown';

var floor  = Math.floor,
    random = Math.random;

app.factory('Quote', function() {
  function randomIndex(array) {
    var index = floor(random() * array.length)
    return array[index];
  }

  function randomObject(array, listName) {
    var meta = randomIndex(array),
        list = meta[listName],
        data = randomIndex(list);

    return {
      meta: meta,
      data: data
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
