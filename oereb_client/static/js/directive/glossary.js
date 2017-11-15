goog.provide('oereb.glossaryDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.multilingualTextFilter');
goog.require('oereb.sortGlossaryFilter');

/**
 * Directive definition function.
 *
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.glossaryDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/glossary.html',
    scope: {},
    link: function(scope) {

      /** @export {Array} */
      scope.data = ExtractService.getGlossary();

      // Update data on extract loaded event
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getGlossary();
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebGlossary
 * @module oereb
 *
 * @description Directive showing the glossary for the current extract.
 */
oereb.module.directive('oerebGlossary', oereb.glossaryDirective);