(function() {
  'use strict';

  angular
    .module('fireflies')

    // The location where the site's json data is stored.
    .constant('DATA_PATH', 'js/data.json')

    // The text displayed when there is no author set for the quote/background.
    .constant('NO_AUTHOR', 'Unknown')

    // These are the parameters that the Url can take to display a quote/image based
    // on user input, instead of being randomly chosen.
    //
    // The 'quote' parameter can only be an array index, while 'image' can be an
    // array index or a string matching the 'name' property of the image.
    //
    // Example usage:
    //
    //   ?author="Chibird"&quote=0
    //   ?author="Grace Hopper"&quote=0
    //
    //   ?artist="Desmond Wong"&image=1
    //   ?artist="Rhean Propp"&image="Autumn Grass"
    .constant('QUERY_KEYWORDS', {
      quote: ['author', 'quote'],
      image: ['artist', 'image']
    });
})();
