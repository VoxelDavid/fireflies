
'use strict';

app.controller('FirefliesCtrl', function($scope, data, background, Quote, Stellar) {
  Stellar.init();

  data.then(function(json) {
    var quote = new Quote(json),
        imageData = background.getFrom(json);

    // Apply the class of the chosen image to the scope.
    $scope.backgroundClass = imageData.className;

    // Quote and author are applied via the ng-bind-html directive, which uses
    // $sanitize to preserve html tags and entities.
    $scope.quote  = quote.text;
    $scope.author = quote.author;
    $scope.source = quote.source;
    $scope.title  = quote.title;
  });
});

