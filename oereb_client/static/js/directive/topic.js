goog.provide('oereb.topicDirective');

goog.require('oereb');
goog.require('oereb.MapService');
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
 * @param {oereb.MapService} MapService Angular service for map handling.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.topicDirective = function($timeout, MapService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/topic.html',
    scope: {
      /** @export */ theme: '=',
      /** @export */ selectedTheme: '='
    },
    link: function(scope, element) {

      /**
       * @export {boolean}
       */
      scope.isLoading = false;

      /**
       * @type {ol.layer.Layer|undefined}
       */
      scope.layer = undefined;
      angular.forEach(MapService.getTopicLayers(), function(layer) {
        if (layer.get('topic') === scope.theme['Code']) {
          scope.layer = layer;
          scope.layer.getSource().on('imageloadstart', function() {
            $timeout(function() {
              scope.isLoading = true;
            });
          }, scope);
          scope.layer.getSource().on(['imageloadend', 'imageloaderror'], function() {
            $timeout(function() {
              scope.isLoading = false;
            });
          }, scope);
          return false;
        }
      });

      var badgeIconCollapsed = 'fa-chevron-down';
      var badgeIconExpanded = 'fa-chevron-up';

      /** @export {string} */
      scope.id = 'topic-' + parseInt(Math.random() * Date.now());

      /** @export {string} */
      scope.badgeIcon = badgeIconCollapsed;

      /**
       * @export {number}
       */
      scope.opacity = 100;

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

      // Watch layer opacity
      scope.$watch('opacity', function() {
        if (angular.isDefined(scope.layer)) {
          scope.layer.setOpacity(scope.opacity / 100);
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

      /**
       * Returns the current badge icon class.
       * @returns {string} The badge icon class.
       * @export
       */
      scope.getBadgeIcon = function() {
        if (scope.isLoading) {
          return 'fa-spinner fa-pulse';
        }
        return scope.badgeIcon;
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