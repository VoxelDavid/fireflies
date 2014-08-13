(function() {
  'use strict';

  angular
    .module('fireflies')
    .controller('ImageController', ImageController);

  function ImageController(dataService, stellar) {
    var vm = this;

    stellar();

    dataService.randomImage().then(function(data) {
      vm.className = data.className;
    });
  }
})();
