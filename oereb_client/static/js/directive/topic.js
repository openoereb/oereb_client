goog.provide('oereb.topicDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.TopicController');
goog.require('oereb.legendDirective');
goog.require('oereb.legalDocumentsDirective');
goog.require('oereb.responsibleOfficesDirective');

/**
 * @function
 *
 * @description Angular directive definition function.
 *
 * @param {angular.$timeout} $timeout Angular $timeout service.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.topicDirective = function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/topic.html',
    scope: {
      /** @export */ theme: '=',
      /** @export */ selectedTheme: '='
    },
    link: function(scope, element) {

      var badgeIconCollapsed = 'fa-chevron-down';
      var badgeIconExpanded = 'fa-chevron-up';

      /** @export {string} */
      scope.id = 'topic-' + parseInt(Math.random() * Date.now());

      /** @export {string} */
      scope.badgeIcon = badgeIconCollapsed;

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

      // Watch selected theme to show or hide collapsible element
      scope.$watch('selectedTheme', function(value) {
        if (value === scope.theme['Code']) {
          collapsible.collapse('show');
        }
        else {
          collapsible.collapse('hide');
        }
      });

      /**
       * Updates the selected theme.
       * @export
       */
      scope.select = function() {
        scope.selectedTheme = scope.theme['Code'];
      };

      /**
       * Returns true if the theme is currently selected.
       * @returns {boolean}
       * @export
       */
      scope.isSelected = function() {
        return scope.theme['Code'] === scope.selectedTheme;
      };

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebTopic
 * @module oereb
 * @restrict E
 *
 * @description Collapsible container for the data of a certain topic.
 *
 * @param {Object} theme The theme object.
 * @param {string} selectedTheme The currently selected theme.
 */
oereb.module.directive('oerebTopic', oereb.topicDirective);