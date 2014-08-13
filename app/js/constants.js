(function() {
  'use strict';

  angular
    .module('fireflies')

    // The location where the site's json data is stored.
    .constant('DATA_PATH', 'js/data.json')

    // The text displayed when there is no author set for the quote/background.
    .constant('NO_AUTHOR', 'Unknown');
})();
