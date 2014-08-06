
'use strict';

// The text displayed when there is no author set for the quote/background.
var NO_AUTHOR = 'Unknown';

var JSON_PATH = 'js/data.json';

var random = Math.random,
    floor  = Math.floor;

var Data = {};


/* Utilities
============================================================================= */

function randomIndex(array) {
  var index = floor(random() * array.length);
  return array[index];
}

function authorName(author) {
  if (!author) {
    return NO_AUTHOR;
  } else {
    return author;
  }
}

function toplevel(obj, type) {
  var meta = obj.meta,
      data = obj.data;

  function quote() {
    return {
      author: authorName(meta.author),
      title: data.title,
      source: data.source,
      text: data.text
    };
  }

  function image() {
    return {
      author: authorName(meta.author),
      name: data.name,
      className: data.className,
      source: data.source
    };
  }

  if (type === 'quote') {
    return quote();
  } else if (type === 'image') {
    return image();
  }
}


/* Data Methods
============================================================================= */

Data.randomObject = function(array, listName) {
  var meta = randomIndex(array),
      list = meta[listName],
      data = randomIndex(list);

  return {
    meta: meta,
    data: data
  };
};

Data.quote = function(json) {
  var quoteData = json.quoteData,
      randomQuoteData = this.randomObject(quoteData, 'quotes'),
      quote = toplevel(randomQuoteData, 'quote');

  return quote;
};

Data.background = function(json) {
  var imageData = json.imageData,
      randomImageData = this.randomObject(imageData, 'images'),
      image = toplevel(randomImageData, 'image');

  return image;
};


/* Services & Factories
============================================================================= */

app.factory('siteData', function($http) {
//  return $http.get('js/data.json');
  var data = $http.get(JSON_PATH).then(function(json) {
    return json.data;
  });

  return data;
});

app.factory('quote', function(siteData) {
  var quote = siteData.then(function(json) {
    return Data.quote(json);
  });

  return quote;
});

app.factory('image', function(siteData) {
  var image = siteData.then(function(json) {
    return Data.background(json);
  });

  return image;
});
