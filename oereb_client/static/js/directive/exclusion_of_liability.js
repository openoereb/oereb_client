goog.provide('oereb.exclusionOfLiabilityDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.multilingualTextFilter');
goog.require('oereb.searchInformationFilter');
goog.require('oereb.markFilter');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.exclusionOfLiabilityDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/exclusion_of_liability.html',
    scope: {
      search: '='
    },
    link: function(scope) {

      /** @export {Array} */
      scope.data = ExtractService.getExclusionsOfLiability();

      // Update data on extract loaded event
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getExclusionsOfLiability();
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebExclusionOfLiability
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Directive showing the exclusions of liability for the current extract.
 *
 * @param {string} search The filter term.
 */
oereb.module.directive('oerebExclusionOfLiability', oereb.exclusionOfLiabilityDirective);