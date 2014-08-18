(function() {
  'use strict';

  angular
    .module('fireflies')
    .factory('siteData', siteData);

  siteData.$inject = ['$http', 'DATA_PATH'];

  function siteData($http, DATA_PATH) {
    var data = $http.get(DATA_PATH);

    function getData(json) {
      return json.data;
    }

    return data.then(getData);
  }
})();
