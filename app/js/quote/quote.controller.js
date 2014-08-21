(function() {
  'use strict';

  angular
    .module('fireflies.quote')
    .controller('QuoteController', QuoteController);

  QuoteController.$inject = ['dataservice'];

  function QuoteController(dataservice) {
    var vm = this;
    vm.quote = {};

    activate();

    function activate() {
      getQuote();
    }

    function getQuote() {
      return dataservice.getQuote()
        .then(function(data) {
          vm.quote = data;
          return vm.quote;
        });
    }
  }
})();
