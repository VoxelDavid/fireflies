(function() {
  'use strict';

  angular
    .module('fireflies.background')
    .controller('ImageController', ImageController);

  ImageController.$inject = ['dataservice', 'stellar'];

  function ImageController(dataservice, stellar) {
    var vm = this;
    vm.image = {};

    activate();

    function activate() {
      stellar();
      getImage();
    }

    function getImage() {
      return dataservice.getImage()
        .then(function(data) {
          vm.image = data;
          return vm.image;
        });
    }
  }
})();
