angular
  .module('docs')
  .controller('NavController', NavController);

function NavController($state) {
    var ctrl = this;
    ctrl.current = function(part) {
      return $state.current.url.startsWith(part);
    };
}

NavController.$inject = ["$state"];