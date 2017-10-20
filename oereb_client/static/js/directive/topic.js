goog.provide('oereb.topicDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.TopicController');
goog.require('oereb.legendDirective');
goog.require('oereb.legalDocumentsDirective');

/**
 * @function
 *
 * @description Angular directive definition function.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.topicDirective = function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/topic.html',
    scope: {
      /** @export */ theme: '=',
      /** @export */ selectedTheme: '='
    },
    link: function(scope, element) {

      /** @export {string} */
      scope.id = 'topic-' + parseInt(Math.random() * Date.now());

      var collapsible = element.find('.collapse').eq(0);

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