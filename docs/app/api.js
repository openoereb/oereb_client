angular
  .module('docs')
  .controller('ApiController', ApiController);

function ApiController(API_DATA, VERSION) {
    var ctrl = this;
    ctrl.allPages = API_DATA;
    ctrl.version = VERSION;
}

ApiController.$inject = ["API_DATA", "VERSION"];