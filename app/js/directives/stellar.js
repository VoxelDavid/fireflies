
'use strict';

// Include as a dependency and initialize with Stellar.init();

app.factory('Stellar', function() {
  function init(options) {
    angular.element.stellar(options);
  }

  return {
    init: init
  };
});
