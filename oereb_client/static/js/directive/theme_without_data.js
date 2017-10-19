goog.provide('oereb.themeWithoutDataDirective');

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
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.themeWithoutDataDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/theme_without_data.html',
    scope: {
      /** @export */ toggledGroup: '='
    },
    link: function(scope, element) {

      /** @export {string} */
      scope.id = 'without-data-' + parseInt(Math.random() * Date.now());

      /** @export {Array} */
      scope.data = [];

      // Update data on loaded extract
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getThemesWithoutData();
      });

      // Get collapsible element
      var collapsible = element.find('.collapse').eq(0);

      /** @export */
      scope.toggle = function () {
        collapsible.collapse('show');
        scope.toggledGroup = 'ThemeWithoutData';
      };

      scope.$watch('toggledGroup', function(value) {
        if (value !== 'ThemeWithoutData') {
          collapsible.collapse('hide');
        }
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebThemeWithoutData
 * @module oereb
 *
 * @description Collapsible element containing the themes without data.
 *
 * @param {string} toggledGroup The currently toggled group.
 */
oereb.module.directive('oerebThemeWithoutData', oereb.themeWithoutDataDirective);