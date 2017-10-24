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
 * @param {string} oerebEventExtractClosed Event name for closed extract.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname MainController
 */
oereb.MainController = function($scope, ExtractService, MapService, oerebEventEgridSelected,
                                oerebEventExtractLoaded, oerebEventExtractClosed) {

  this.$scope_ = $scope;
  this.ExtractService_ = ExtractService;
  this.oerebEventEgridSelected_ = oerebEventEgridSelected;
  this.oerebEventExtractLoaded_ = oerebEventExtractLoaded;
  this.oerebEventExtractClosed_ = oerebEventExtractClosed;

  /** @export {boolean} */
  this.extractActive = false;

  /** @export {boolean} */
  this.informationActive = false;

  /** @export {string} */
  this.toggledGroup = undefined;

  // Load extract on selected egrid
  this.$scope_.$on(this.oerebEventEgridSelected_, function(event, egrid, center) {
    this.ExtractService_.queryExtractById(egrid).then(
      function() {
        this.$scope_.$broadcast(this.oerebEventExtractLoaded_);
        this.extractActive = angular.isDefined(this.ExtractService_.getExtract());
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

/**
 * Hide the extract panel and fires the extract closed event.
 * @export
 */
oereb.MainController.prototype.closeExtract = function() {
  this.informationActive = false;
  this.extractActive = false;
  this.$scope_.$broadcast(this.oerebEventExtractClosed_);
};

/**
 * Shows/hides the information panel.
 * @export
 */
oereb.MainController.prototype.toggleInformation = function() {
  this.informationActive = !this.informationActive;
};

oereb.module.controller('MainController', oereb.MainController);
