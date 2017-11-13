goog.provide('oereb.themeWithoutDataDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');

/**
 * @function
 *
 * @description Directive definition function.
 *
 * @param {angular.$timeout} $timeout Angular $timeout service.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.themeWithoutDataDirective = function($timeout, ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/theme_without_data.html',
    scope: {
      /** @export */ toggledGroup: '='
    },
    link: function(scope, element) {

      var badgeIconCollapsed = 'fa-chevron-down';
      var badgeIconExpanded = 'fa-chevron-up';

      /** @export {string} */
      scope.id = 'without-data-' + parseInt(Math.random() * Date.now());

      /** @export {string} */
      scope.badgeIcon = badgeIconCollapsed;

      /** @export {Array} */
      scope.data = [];

      // Update data on loaded extract
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getThemesWithoutData();
      });

      // Get collapsible element
      var collapsible = element.find('.collapse').first();

      // Listen on show event to switch badge icon
      collapsible.on('show.bs.collapse', function(evt) {
        if (evt.target.id === scope.id + '-collapse') {
          $timeout(function () {
            scope.badgeIcon = badgeIconExpanded;
          });
        }
      });

      // Listen on hide event to switch badge icon
      collapsible.on('hide.bs.collapse', function(evt) {
        if (evt.target.id === scope.id + '-collapse') {
          $timeout(function () {
            scope.badgeIcon = badgeIconCollapsed;
          });
        }
      });

      /** @export */
      scope.toggle = function () {
        if (scope.data.length > 0) {
          collapsible.collapse('show');
          scope.toggledGroup = 'ThemeWithoutData';
        }
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