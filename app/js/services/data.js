
'use strict';

app.factory('Data', function($http) {
	return $http.get('js/data.json');
});
