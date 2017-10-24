goog.provide('oereb.MainController');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.MapService');

/**
 * `oereb_client` main controller.
 * @param {angular.Scope} $scope The controller scope.
 * @param {angular.Location} $location The location provided by angular.
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {string} oerebEventEgridSelected Event name for selected EGRID.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 * @param {string} oerebEventExtractClosed Event name for closed extract.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname MainController
 */
oereb.MainController = function($scope, $location, ExtractService, oerebEventEgridSelected,
                                oerebEventExtractLoaded, oerebEventExtractClosed) {

  this.$scope_ = $scope;
  this.$location_ = $location;
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
  this.$scope_.$on(this.oerebEventEgridSelected_, function(event, egrid) {
    this.getExtractByEgrid(egrid);
  }.bind(this));
  // Initially load stats if EGRID defined
  var egrid = this.$location_.search()['egrid'];
  if (angular.isString(egrid) && egrid.length > 0) {
    this.getExtractByEgrid(egrid);
  }
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

/**
 * Starts the extract creating with the desired egrid.
 * @param {string} egrid The EGRID as a string.
 * @export
 */
oereb.MainController.prototype.getExtractByEgrid = function(egrid) {
  this.ExtractService_.queryExtractById(egrid).then(
    function() {
      this.$scope_.$broadcast(this.oerebEventExtractLoaded_);
      this.extractActive = angular.isDefined(this.ExtractService_.getExtract());
      this.$location_.search('egrid', egrid);
    }.bind(this),
    function() {
      this.extractActive = false;
    }.bind(this)
  );
};


oereb.module.controller('MainController', oereb.MainController);
