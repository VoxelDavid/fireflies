
'use strict';

app.controller('FirefliesCtrl', function($scope, data, background, quote, Stellar) {
  Stellar.init();

  data.then(function(json) {
    var quoteData = quote.getFrom(json),
        imageData = background.getFrom(json);

    // Apply the class of the chosen image to the scope.
    $scope.backgroundClass = imageData.className;

    /* Quote and author are applied via the ng-bind-html directive,
     * which uses $sanitize to preserve html tags and entities. */
    $scope.quote  = quoteData.quote;
    $scope.author = quoteData.author;
    $scope.source = quoteData.source;
    $scope.title  = quoteData.title;
  });
});

