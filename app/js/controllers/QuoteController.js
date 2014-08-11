'use strict';

app.controller('QuoteController', function(quote) {
  var scope = this;

  quote.then(function(data) {
    // The quote's author and text are set by the 'ng-bind-html' directive,
    // which uses $sanitize to preserve html tags and entities.
    scope.text   = data.text;
    scope.author = data.author;
    scope.source = data.source;
    scope.title  = data.title;
  });
});
