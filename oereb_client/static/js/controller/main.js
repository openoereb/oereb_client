goog.provide('oereb.MainController');

goog.require('oereb');

/**
 * `oereb_client` main controller.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname MainController
 */
oereb.MainController = function() {
  this.extractActive = false;
};

oereb.module.controller('MainController', oereb.MainController);