
'use strict';

// Used to allow us to work with Stellar.js from within Angular.

app.factory('stellar', function() {
  return function(options) {
    return angular.element.stellar(options);
  };
});
