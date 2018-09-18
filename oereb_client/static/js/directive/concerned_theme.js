goog.provide('oereb.concernedThemeDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.topicDirective');
goog.require('oereb.TopicController');

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
oereb.concernedThemeDirective = function($timeout, ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/concerned_theme.html',
    scope: {
      /** @export */ toggledGroup: '='
    },
    link: function(scope, element) {

      var badgeIconCollapsed = 'fa-chevron-down';
      var badgeIconExpanded = 'fa-chevron-up';

      /** @export {string} */
      scope.id = 'concerned-' + parseInt(Math.random() * Date.now());

      /** @export {string} */
      scope.badgeIcon = badgeIconCollapsed;

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
          scope.toggledGroup = 'ConcernedTheme';
        }
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
 * @restrict E
 *
 * @description
 *
 * Collapsible element containing the concerned themes.
 *
 * @param {string} toggledGroup The currently toggled group.
 */
oereb.module.directive('oerebConcernedTheme', oereb.concernedThemeDirective);