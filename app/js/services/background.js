
'use strict';

app.factory('background', function($location) {
  var background = {
    getFrom: function(json) {
      var background;

      /* Check if the URL contains a query string for setting the background.
       * If not, get a random image from the json file. */
      if (detectImageQuery()) {
        background = this.getFromQuery(json);
      } else {
        background = this.getRandom(json);
      }

      var image = background.image,
          imageList = background.imageList;

      var imageData = {
        className: imageList.className
      };

      // Propagate the imageData object.
      if (image.hasOwnProperty('author')) {
        imageData.author = image.author;
      }
      if (imageList.hasOwnProperty('name')) {
        imageData.name = imageList.name;
      }
      if (imageList.hasOwnProperty('source')) {
        imageData.source = imageList.source;
      }

      return imageData;
    },

    getRandom: function(json) {
      var backgroundArray = json.data.backgrounds,

          i = randomArrayIndex(backgroundArray),
          randomImage = backgroundArray[i],

          j = randomArrayIndex(randomImage.imageList),
          randomImageListObj = randomImage.imageList[j];

      return {
        image: randomImage,
        imageList: randomImageListObj
      };
    },

    getFromQuery: function(json) {
      var backgroundArray = json.data.backgrounds,
          query = $location.search(),
          queriedImage,
          queriedImageListObj;

      if (query.bg) {
        queriedImage = backgroundArray[query.bg];
      }

      // Check if 'bgSub' is set in the query string. If not, set the
      // imageList index to the first object.
      if (query.bgSub) {
        queriedImageListObj = queriedImage.imageList[query.bgSub];
      } else {
        queriedImageListObj = queriedImage.imageList[0];
      }

      return {
        image: queriedImage,
        imageList: queriedImageListObj
      };
    }
  };

  /* Checks the current url for a query string. Used to decide
   * between query based or random image setting. */
  function detectImageQuery() {
    var query = $location.search();

    if ((query.bg) || (query.bg && query.bgSub)) {
      return true;
    }
  }

  function randomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  return background;
});

