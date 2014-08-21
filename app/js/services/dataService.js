(function() {
  'use strict';

  angular
    .module('fireflies')
    .service('dataservice', dataservice);

  dataservice.$inject = ['$http', 'DATA_PATH', 'NO_AUTHOR'];

  function dataservice($http, DATA_PATH, NO_AUTHOR) {
    return {
      siteData: siteData,
      getQuote: getQuote,
      getImage: getImage
    };


    /* Methods
    ========================================================================= */

    function siteData() {
      return $http.get(DATA_PATH)
        .then(success);

      function success(json) {
        return json.data;
      }
    }

    /* These two functions are placeholders for now. Soon the service will be
     * checking the query string to get quotes/images, and then falling back to
     * the random ones, if no query is specified. */

    function getQuote() {
      return getRandomQuote();
    }

    function getImage() {
      return getRandomImage();
    }


    /* Utilites
    ========================================================================= */

    function getRandomQuote() {
      return siteData()
        .then(success);

      function success(json) {
        var quoteData = json.quoteData,
            randomQuoteData = randomObject(quoteData, 'quotes'),
            quote = toplevel(randomQuoteData, 'quote');

        return quote;
      }
    }

    function getRandomImage() {
      return siteData()
        .then(success);

      function success(json) {
        var imageData = json.imageData,
            randomImageData = randomObject(imageData, 'images'),
            image = toplevel(randomImageData, 'image');

        return image;
      }
    }

    // Used to find the initial data and metadata objects in the json file
    function randomIndex(array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    }

    function randomObject(array, listName) {
      var data = randomIndex(array),
          objectList = data[listName],
          content = randomIndex(objectList);

      return {
        data: data,
        content: content
      };
    }

    // Simple function to check if the 'author' property exists.
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
          content = obj.content,
          merge;

      data.author = checkAuthor(data.author);
      merge = mergeObjects(data, content);

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
  }
})();
