'use strict';

app.controller('QuoteController', function(quote) {
  var scope = this;

  quote.then(function(json) {
    // The quote's author and text are set by the 'ng-bind-html' directive,
    // which uses $sanitize to preserve html tags and entities.
    scope.text   = json.text;
    scope.author = json.author;
    scope.source = json.source;
    scope.title  = json.title;
  });
});
