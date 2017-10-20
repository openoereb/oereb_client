goog.provide('oereb.legendDirective');

goog.require('oereb');
goog.require('oereb.multilingualTextFilter');

/**
 * @function
 *
 * @description Directive definition function
 *
 * @param {oereb.ExtractService} ExtractService Service for extract handling.
 *
 * @returns {angular.Directive} Directive definition object.
 *
 * @ngInject
 */
oereb.legendDirective = function(ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/legend.html',
    scope: {
      /** @export */ themeCode: '='
    },
    link: function(scope) {

      /** @export {Array|undefined} */
      scope.legendEntries = ExtractService.getLegend(scope.themeCode);

    }
  };
};

/**
 * @ngdoc directive
 * @name oerebLegend
 * @module oereb
 * @restrict E
 *
 * @description The legend entries and calculations for the current topic.
 *
 * @param {Array} restrictions The list of restrictions for the current topic.
 */
oereb.module.directive('oerebLegend', oereb.legendDirective);