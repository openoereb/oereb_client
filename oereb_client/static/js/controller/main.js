goog.provide('oereb.MainController');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.MapService');

/**
 * `oereb_client` main controller.
 * @param {angular.Scope} $scope The controller scope.
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {oereb.MapService} MapService Angular service for map handling.
 * @param {string} oerebEventEgridSelected Event name for selected EGRID.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname MainController
 */
oereb.MainController = function($scope, ExtractService, MapService, oerebEventEgridSelected,
                                oerebEventExtractLoaded) {

  /** @export {boolean} */
  this.extractActive = false;

  // Load extract on selected egrid
  $scope.$on(oerebEventEgridSelected, function(event, egrid, center) {
    ExtractService.queryExtractById(egrid).then(
      function() {
        $scope.$broadcast(oerebEventExtractLoaded);
        this.extractActive = angular.isDefined(ExtractService.getExtract());
        if (center) {
          var geometry = new ol.geom.MultiPolygon(ExtractService.getRealEstate()["Limit"]["coordinates"]);
          MapService.getMap().getView().fit(geometry, {
            padding: [0, 0, 0, 500]
          })
        }
      }.bind(this),
      function() {
        this.extractActive = false;
      }.bind(this)
    );
  }.bind(this));

};

oereb.module.controller('MainController', oereb.MainController);
