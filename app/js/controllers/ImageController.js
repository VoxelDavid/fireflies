'use strict';

app.controller('ImageController', function(image, stellar) {
  var scope = this;

  stellar();

  image.then(function(json) {
    scope.className = json.className;
  });
});
