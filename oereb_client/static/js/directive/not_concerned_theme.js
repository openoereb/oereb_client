goog.provide('oereb.notConcernedThemeDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');

/**
 * @function
 *
 * @description Directive definition function.
 *
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 *
 * @returns {Object} Angular directive definition object.
 *
 * @ngInject
 */
oereb.notConcernedThemeDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/not_concerned_theme.html',
    scope: {
      toggledGroup: '='
    },
    link: function(scope, element) {

      scope.id = 'not-concerned-' + parseInt(Math.random() * Date.now());

      /** @export {Array} */
      scope.data = [];

      // Update data on loaded extract
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getNotConcernedThemes();
      });

      // Get collapsible element
      var collapsible = element.find('.collapse').eq(0);

      /** @export */
      scope.toggle = function () {
        collapsible.collapse('show');
        scope.toggledGroup = 'NotConcernedTheme';
      };

      scope.$watch('toggledGroup', function(value) {
        if (value !== 'NotConcernedTheme') {
          collapsible.collapse('hide');
        }
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebNotConcernedTheme
 * @module oereb
 *
 * @description Collapsible element containing the not concerned themes.
 *
 * @param {string} toggledGroup The currently toggled group.
 */
oereb.module.directive('oerebNotConcernedTheme', oereb.notConcernedThemeDirective);