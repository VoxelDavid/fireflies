(function() {
  'use strict';

  angular
    .module('fireflies')
    .controller('QuoteController', QuoteController);

  // The quote's author and text are set by the 'ng-bind-html' directive,
  // which uses $sanitize to preserve html tags and entities.

  function QuoteController(dataService) {
    var vm = this;

    dataService.randomQuote().then(function(data) {
      vm.text   = data.text;
      vm.author = data.author;
      vm.source = data.source;
      vm.title  = data.title;
    });
  }
})();
