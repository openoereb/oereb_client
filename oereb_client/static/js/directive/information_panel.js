goog.provide('oereb.informationPanelDirective');

goog.require('oereb');
goog.require('oereb.generalInformationDirective');
goog.require('oereb.exclusionOfLiabilityDirective');
goog.require('oereb.glossaryDirective');

/**
 * @function
 *
 * @description
 *
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
       * @ngdoc method
       * @name oerebInformationPanel#close
       *
       * @description
       *
       * Closes the information panel.
       *
       * @export
       */
      scope.close = function() {
        scope.search = undefined;
        scope.informationActive = false;
      };

      /**
       * @ngdoc method
       * @name oerebInformationPanel#setActiveTab
       *
       * @description
       *
       * Switches the active tab.
       *
       * @param {number} index The index of the tab to be shown.
       *
       * @export
       */
      scope.setActiveTab = function(index) {
        scope.search = undefined;
        scope.activeTab = index;
      };

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebInformationPanel
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Directive showing the information panel for the current extract.
 *
 * @param {boolean} informationActive The visibility flag.
 */
oereb.module.directive('oerebInformationPanel', oereb.informationPanelDirective);