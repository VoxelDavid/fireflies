'use strict';

app.factory('siteData', function($http, JSON_PATH) {
  var data = $http.get(JSON_PATH).then(function(json) {
    return json.data;
  });

  return data;
});
