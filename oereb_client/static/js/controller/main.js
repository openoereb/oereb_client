goog.provide('oereb.MainController');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.MapService');

/**
 * @ngdoc function
 * @module oereb
 * @name MainController
 *
 * @description
 *
 * `oereb_client` main controller.
 *
 * @param {angular.Scope} $scope The controller scope.
 * @param {angular.Location} $location The location provided by angular.
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {oereb.MapService} MapService Angular service for map handling.
 * @param {string} oerebSupport JSON-encoded support configuration.
 * @param {string} oerebEventEgridSelected Event name for selected EGRID.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 * @param {string} oerebEventExtractClosed Event name for closed extract.
 *
 * @constructor
 * @ngInject
 */
oereb.MainController = function($scope, $location, ExtractService, MapService, oerebSupport,
                                oerebEventEgridSelected, oerebEventExtractLoaded, oerebEventExtractClosed) {

  this.$scope_ = $scope;
  this.$location_ = $location;
  this.ExtractService_ = ExtractService;
  this.MapService_ = MapService;
  this.oerebEventEgridSelected_ = oerebEventEgridSelected;
  this.oerebEventExtractLoaded_ = oerebEventExtractLoaded;
  this.oerebEventExtractClosed_ = oerebEventExtractClosed;

  /** @export {Object} */
  this.support = angular.fromJson(oerebSupport);

  /** @export {string} */
  this.permaLink = '';

  /** @export {boolean} */
  this.extractActive = false;

  /**
   * @export {boolean}
   */
  this.extractCollapsed = false;

  /** @export {boolean} */
  this.informationActive = false;

  /** @export {boolean} */
  this.errorActive = false;

  /** @export {function} */
  this.retryCallback = function() {};

  /** @export {boolean} */
  this.loading = false;

  /** @export {string} */
  this.toggledGroup = undefined;

  // Load extract on selected egrid
  this.$scope_.$on(this.oerebEventEgridSelected_, function(event, egrid, center) {
    this.getExtractByEgrid_(egrid, center);
  }.bind(this));

  // Initially load stats if EGRID defined
  var egrid = this.$location_.search()['egrid'];
  if (angular.isString(egrid) && egrid.length > 0) {
    this.getExtractByEgrid_(egrid, true);
  }

  // Add tooltip for close button
  angular.element(['button#extract-close', 'button#error-close']).tooltip({
    placement: 'left',
    trigger: 'hover',
    title: 'Auszug schliessen'
  });

};

/**
 * @ngdoc method
 * @name MainController#closeExtract
 *
 * @description
 *
 * Hide the extract panel and fires the extract closed event.
 *
 * @export
 */
oereb.MainController.prototype.closeExtract = function() {
  this.informationActive = false;
  this.extractActive = false;
  this.errorActive = false;
  this.$scope_.$broadcast(this.oerebEventExtractClosed_);
  this.$location_.search('egrid', null);
};

/**
 * @ngdoc method
 * @name MainController#collapseExtract
 *
 * @description
 *
 * Collapse the extract panel.
 *
 * @export
 */
oereb.MainController.prototype.collapseExtract = function() {
  this.informationActive = false;
  this.extractActive = false;
  this.errorActive = false;
  this.extractCollapsed = true;
};

/**
 * @ngdoc method
 * @name MainController#expandExtract
 *
 * @description
 *
 * Expand the extract panel.
 *
 * @export
 */
oereb.MainController.prototype.expandExtract = function() {
  this.extractCollapsed = false;
  this.informationActive = false;
  this.errorActive = false;
  this.extractActive = true;
};

/**
 * @ngdoc method
 * @name MainController#toggleInformation
 *
 * @description
 *
 * Shows/hides the information panel.
 *
 * @export
 */
oereb.MainController.prototype.toggleInformation = function() {
  this.informationActive = !this.informationActive;
};

/**
 * @ngdoc method
 * @name MainController#getExtractByEgrid_
 *
 * @description
 *
 * Starts the extract creating with the desired egrid.
 *
 * @param {string} egrid The EGRID as a string.
 * @param {boolean} center Switch if the map should be recentered or not.
 *
 * @private
 */
oereb.MainController.prototype.getExtractByEgrid_ = function(egrid, center) {
  this.informationActive = false;
  this.extractActive = false;
  this.extractCollapsed = false;
  this.errorActive = false;
  this.loading = true;
  this.ExtractService_.queryExtractById(egrid).then(
    function() {
      this.loading = false;
      this.$scope_.$broadcast(this.oerebEventExtractLoaded_);
      this.extractActive = angular.isDefined(this.ExtractService_.getExtract());
      if (center) {
        var geometry = new ol.geom.MultiPolygon(this.ExtractService_.getRealEstate()["Limit"]["coordinates"]);
        var padding = [0, 0, 0, 500];
        if (angular.element(document.body).width() < 1200) {
          padding = [130, 0, 0, 0];
        }
        this.MapService_.getMap().getView().fit(geometry, {
          padding: padding
        })
      }
      this.$location_.search('egrid', egrid);
    }.bind(this),
    function() {
      this.loading = false;
      this.extractActive = true;
      this.errorActive = true;
      this.retryCallback = function() {
        this.getExtractByEgrid_(egrid, center);
      };
    }.bind(this)
  );
};

oereb.module.controller('MainController', oereb.MainController);
