
'use strict';

// The text displayed when there is no author set for the quote/background.
var NO_AUTHOR = 'Unknown';

var random = Math.random,
    floor  = Math.floor;

var Data = {};


/* Utilities
============================================================================= */

// Used to find the initial data and metadata objects in the json file
function randomIndex(array) {
  var index = floor(random() * array.length);
  return array[index];
}

// Used to make checking if an author exists easier
function checkAuthor(authorName) {
  if (authorName) {
    return authorName;
  } else {
    return NO_AUTHOR;
  }
}

// Takes the data that's seperated in the data and metadata objects and places
// their values into a new object.
function toplevel(obj) {
  var data = obj.data,
      content = obj.content;

  data.author = checkAuthor(data.author);

  var merge = mergeObjects(data, content);

  return merge;
}

// Combines any number of objects into a single object.
//
// Example usage:
//
//   var obj1 = { hi: "Hello, World", bye: "Goodbye" },
//       obj2 = { yes: "Yes", no: "No", hi: "Hello" },
//       merged = mergeObjects(obj1, obj2)
//
//   merged = {
//     hi: "Hello",
//     bye: "Goodbye",
//     yes: "Yes",
//     no: "No"
//   }
function mergeObjects() {
  var args = arguments,
      merged = {};

  if (args.length < 2) { return; }

  for (var i = 0; i < args.length; i++) {
    var obj = args[i];

    for (var attr in obj) {
      merged[attr] = obj[attr];
    }
  }

  return merged;
}


/* Data Methods
============================================================================= */

Data.randomObject = function(array, listName) {
  var data = randomIndex(array),
      objectList = data[listName],
      content = randomIndex(objectList);

  return {
    data: data,
    content: content
  };
};


/* Services & Factories
============================================================================= */

app.factory('siteData', function($http, JSON_PATH) {
  var data = $http.get(JSON_PATH).then(function(json) {
    return json.data;
  });

  return data;
});

app.factory('quote', function(siteData) {
  return siteData.then(function(json) {
    var quoteData = json.quoteData,
        randomQuoteData = Data.randomObject(quoteData, 'quotes'),
        quote = toplevel(randomQuoteData, 'quote');

    return quote;
  });
});

app.factory('image', function(siteData) {
  return siteData.then(function(json) {
    var imageData = json.imageData,
        randomImageData = Data.randomObject(imageData, 'images'),
        image = toplevel(randomImageData, 'image');

    return image;
  });
});
