goog.provide('oereb.informationPanelDirective');

goog.require('oereb');
goog.require('oereb.exclusionOfLiabilityDirective');
goog.require('oereb.glossaryDirective');

/**
 * Directive definition function.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.informationPanelDirective = function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/information_panel.html',
    scope: {
      /** @export */ informationActive: '='
    },
    link: function(scope) {

      /** @export {number} */
      scope.activeTab = 0;

      /**
       * Closes the information panel.
       * @export
       */
      scope.close = function() {
        scope.informationActive = false;
      };

      /**
       * Switches the active tab.
       * @param {number} index The index of the tab to be shown.
       * @export
       */
      scope.setActiveTab = function(index) {
        scope.activeTab = index;
      };

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebInformationPanel
 * @module oereb
 *
 * @description Directive showing the information panel for the current extract.
 */
oereb.module.directive('oerebInformationPanel', oereb.informationPanelDirective);