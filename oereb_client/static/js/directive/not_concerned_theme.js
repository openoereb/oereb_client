goog.provide('oereb.notConcernedThemeDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {angular.$timeout} $timeout Angular $timeout service.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.notConcernedThemeDirective = function($timeout, ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/not_concerned_theme.html',
    scope: {
      /** @export */ toggledGroup: '='
    },
    link: function(scope, element) {

      var badgeIconCollapsed = 'fa-chevron-down';
      var badgeIconExpanded = 'fa-chevron-up';

      /** @export {string} */
      scope.id = 'not-concerned-' + parseInt(Math.random() * Date.now());

      /** @export {string} */
      scope.badgeIcon = badgeIconCollapsed;

      /** @export {Array} */
      scope.data = [];

      // Update data on loaded extract
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getNotConcernedThemes();
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

      /**
       * @ngdoc method
       * @name oerebNotConcernedTheme#toggle
       *
       * @description
       *
       * Toggles not concerned themes.
       *
       * @export
       */
      scope.toggle = function () {
        if (scope.data.length > 0) {
          collapsible.collapse('show');
          scope.toggledGroup = 'NotConcernedTheme';
        }
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
 * @restrict E
 *
 * @description
 *
 * Collapsible element containing the not concerned themes.
 *
 * @param {string} toggledGroup The currently toggled group.
 */
oereb.module.directive('oerebNotConcernedTheme', oereb.notConcernedThemeDirective);