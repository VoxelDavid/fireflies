
'use strict';

app.factory('data', function($http) {
	return $http.get('js/data.json');
});
