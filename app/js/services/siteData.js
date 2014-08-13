(function() {
  'use strict';

  angular
    .module('fireflies')
    .factory('siteData', siteData);

  function siteData($http, DATA_PATH) {
    return $http.get(DATA_PATH).then(function(json) {
      return json.data;
    });
  }
})();
