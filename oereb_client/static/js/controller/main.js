goog.provide('oereb.MainController');

goog.require('oereb');

/**
 * `oereb_client` main controller.
 * @param {oereb.MapService} MapService Angular service for map handling.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname MainController
 */
oereb.MainController = function(MapService) {

  /** @export {boolean} */
  this.extractActive = false;

  /** @export {ol.Map} */
  this.map = MapService.getMap();

};

oereb.module.controller('MainController', oereb.MainController);