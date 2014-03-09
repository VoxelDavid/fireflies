
'use strict';

app.controller('BackgroundCtrl', function($scope, Data, Background) {
	Data.then(function(json) {
		var imageData = Background.getFrom(json);

		$scope.backgroundClass = imageData.className;
	});
});
