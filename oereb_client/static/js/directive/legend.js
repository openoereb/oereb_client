goog.provide('oereb.legendDirective');

goog.require('oereb');
goog.require('oereb.multilingualTextFilter');

/**
 * @function
 *
 * @description Directive definition function
 *
 * @param {angular.$timeout} $timeout Angular $timeout service.
 * @param {oereb.ExtractService} ExtractService Service for extract handling.
 *
 * @returns {angular.Directive} Directive definition object.
 *
 * @ngInject
 */
oereb.legendDirective = function($timeout, ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/legend.html',
    scope: {
      /** @export */ themeCode: '='
    },
    link: function(scope, element) {

      var graphicsTextHidden = 'vollständige Legende anzeigen';
      var graphicsTextShown = 'vollständige Legende verbergen';
      var graphicsIconHidden = 'fa-chevron-down';
      var graphicsIconShown = 'fa-chevron-up';

      var fullLegend = element.find('.full-legend').first();

      fullLegend.collapse({
        toggle: false
      });

      /** @export {string} */
      scope.graphicsText = graphicsTextHidden;

      /** @export {string} */
      scope.graphicsIcon = graphicsIconHidden;

      /** @export {Object|undefined} */
      scope.legend = ExtractService.getLegend(scope.themeCode);

      /**
       * Show/hide the legend graphics.
       * @export
       */
      scope.toggleGraphics = function() {
        fullLegend.collapse('toggle');
      };

      // Change icon and text if graphics are shown
      fullLegend.on('show.bs.collapse', function(evt) {
        if (fullLegend[0] === evt.target) {
          $timeout(function() {
            scope.graphicsText = graphicsTextShown;
            scope.graphicsIcon = graphicsIconShown;
          });
        }
      });

      // Change icon and text if graphics are hidden
      fullLegend.on('hide.bs.collapse', function(evt) {
        if (fullLegend[0] === evt.target) {
          $timeout(function() {
            scope.graphicsText = graphicsTextHidden;
            scope.graphicsIcon = graphicsIconHidden;
          });
        }
      });

    }
  };
};

/**
 * @ngdoc directive
 * @name oerebLegend
 * @module oereb
 * @restrict E
 *
 * @description The legend entries and calculations for the current topic.
 *
 * @param {Array} themeCode The code of the current topic.
 */
oereb.module.directive('oerebLegend', oereb.legendDirective);