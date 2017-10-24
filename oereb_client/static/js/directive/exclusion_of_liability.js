goog.provide('oereb.exclusionOfLiabilityDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.multilingualTextFilter');

/**
 * Directive definition function.
 *
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.exclusionOfLiabilityDirective = function(ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/exclusion_of_liability.html',
    scope: {},
    link: function(scope) {

      /** @export {Array} */
      scope.data = ExtractService.getExclusionsOfLiability();

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebExclusionOfLiability
 * @module oereb
 *
 * @description Directive showing the exclusions of liability for the current extract.
 */
oereb.module.directive('oerebExclusionOfLiability', oereb.exclusionOfLiabilityDirective);