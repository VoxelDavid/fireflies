'use strict';

app.controller('ImageController', function(image, stellar) {
  var scope = this;

  stellar();

  image.then(function(data) {
    scope.className = data.className;
  });
});
