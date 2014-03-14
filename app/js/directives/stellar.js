
'use strict';

// Include as a dependency and initialize with jQueryStellar.init();

app.factory('jQueryStellar', function() {
	function init() {
		angular.element(window).stellar();
	}

	return {
		init: init
	};
});
