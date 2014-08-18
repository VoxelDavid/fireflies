(function() {
  'use strict';

  angular
    .module('fireflies')
    .controller('FirefliesController', FirefliesController);

  FirefliesController.$inject = ['quotePrepService', 'imagePrepService', 'stellar'];

  function FirefliesController(quotePrepService, imagePrepService, stellar) {
    var vm = this;
    vm.quote = quotePrepService;
    vm.image = imagePrepService;

    stellar();
  }
})();
