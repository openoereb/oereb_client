goog.provide('oereb.MainController');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.MapService');

/**
 * `oereb_client` main controller.
 * @param {angular.Scope} $scope The controller scope.
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {string} oerebEventEgridSelected Event name for selected EGRID.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname MainController
 */
oereb.MainController = function($scope, ExtractService, oerebEventEgridSelected, oerebEventExtractLoaded) {

  /** @export {boolean} */
  this.extractActive = false;

  /** @export {string} */
  this.toggledGroup = undefined;

  // Load extract on selected egrid
  $scope.$on(oerebEventEgridSelected, function(event, egrid) {
    ExtractService.queryExtractById(egrid).then(
      function() {
        $scope.$broadcast(oerebEventExtractLoaded);
        this.extractActive = angular.isDefined(ExtractService.getExtract());
      }.bind(this),
      function() {
        this.extractActive = false;
      }.bind(this)
    );
  }.bind(this));

};

oereb.module.controller('MainController', oereb.MainController);
