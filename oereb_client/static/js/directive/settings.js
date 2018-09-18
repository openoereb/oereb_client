goog.provide('oereb.settingsDirective');

goog.require('oereb');
goog.require('oereb.MapService');
goog.require('oereb.StoreService');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {oereb.MapService} MapService Angular service for map handling.
 * @param {oereb.StoreService} StoreService Angular service for local storage handling.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.settingsDirective = function(MapService, StoreService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/settings.html',
    scope: {},
    link: function(scope, element) {

      element.children('button').tooltip({
        placement: 'right',
        trigger: 'hover',
        title: 'Einstellungen'
      });

      /**
       * @export {boolean}
       */
      scope.showAvailability = StoreService.showAvailability();

      /**
       * @export {boolean}
       */
      scope.showSymbolZoom = StoreService.showSymbolZoom();

      scope.$watch('showAvailability', function(show) {
        if (angular.isDefined(show)) {
          MapService.toggleAvailability(StoreService.showAvailability(show));
        }
      });

      scope.$watch('showSymbolZoom', function(show) {
        if (angular.isDefined(show)) {
          StoreService.showSymbolZoom(show);
        }
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebSettings
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Angular directive for rendering the real estate data.
 */
oereb.module.directive('oerebSettings', oereb.settingsDirective);
