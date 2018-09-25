angular
  .module('docs')
  .controller('VersionController', VersionController);

function VersionController(VERSION) {
    var ctrl = this;
    ctrl.version = VERSION;
}

VersionController.$inject = ["VERSION"];