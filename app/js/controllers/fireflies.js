
'use strict';

app.controller('FirefliesCtrl', function($scope, Stellar, randomQuote, randomImage) {
  Stellar.init();
  
  randomImage.then(function(data) {
    // Apply the class of the chosen image to the scope.
    $scope.backgroundClass = data.className;
  });
  
  randomQuote.then(function(data) {
    // The quote's author and text are set by the 'ng-bind-html' directive,
    // which uses $sanitize to preserve html tags and entities.
    $scope.quote  = data.text;
    $scope.author = data.author;
    $scope.source = data.source;
    $scope.title  = data.title;
  });
});
