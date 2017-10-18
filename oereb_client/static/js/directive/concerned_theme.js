goog.provide('oereb.concernedThemeDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.topicDirective');
goog.require('oereb.TopicController');

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
oereb.concernedThemeDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/concerned_theme.html',
    scope: {
      toggledGroup: '='
    },
    link: function(scope, element) {

      scope.id = 'concerned-' + parseInt(Math.random() * Date.now());

      /** @export {Array} */
      scope.data = [];

      // Update data on loaded extract
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getConcernedThemes();
        if (scope.data.length > 0) {
          scope.selectedTheme = scope.data[0]['Code'];
        }
        scope.toggle();
      });

      // Get collapsible element
      var collapsible = element.find('.collapse').eq(0);

      /** @export */
      scope.toggle = function () {
        collapsible.collapse('show');
        scope.toggledGroup = 'ConcernedTheme';
      };

      scope.$watch('toggledGroup', function(value) {
        if (value !== 'ConcernedTheme') {
          collapsible.collapse('hide');
        }
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebConcernedTheme
 * @module oereb
 *
 * @description Collapsible element containing the concerned themes.
 *
 * @param {string} toggledGroup The currently toggled group.
 */
oereb.module.directive('oerebConcernedTheme', oereb.concernedThemeDirective);