goog.provide('oereb.legendDirective');

goog.require('oereb');
goog.require('oereb.sortLegendFilter');
goog.require('oereb.multilingualTextFilter');
goog.require('oereb.replaceFilter');

/**
 * @function
 *
 * @description Directive definition function
 *
 * @param {angular.$timeout} $timeout Angular $timeout service.
 * @param {oereb.ExtractService} ExtractService Service for extract handling.
 * @param {oereb.ExtractService} StoreService Service for localStorage handling.
 * @param {string} oerebEventSymbolZoomEnabled Symbol zoom status event name.
 *
 * @returns {angular.Directive} Directive definition object.
 *
 * @ngInject
 */
oereb.legendDirective = function($timeout, ExtractService, StoreService, oerebEventSymbolZoomEnabled) {
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
       * Display legend graphics section only if it contains at least one graphic.
       * @return {boolean} True, if there is at least one legend graphic available.
       * @export
       */
      scope.showGraphics = function() {
        if (angular.isObject(scope.legend)) {
          var graphics = scope.legend['graphics'];
          return angular.isArray(graphics) && graphics.length > 0;
        }
        return false;
      };

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

      scope.enableSymbolZoom_ = function() {
        element.find('img.symbol').popover({
          container: 'body',
          placement: 'right',
          html: true,
          template: '<div class="popover symbol-zoom" role="tooltip">' +
                      '<div class="arrow"></div>' +
                      '<h3 class="popover-title"></h3>' +
                      '<div class="popover-content"></div>' +
                    '</div>'
        });
      };

      scope.disableSymbolZoom_ = function() {
        element.find('img.symbol').popover('destroy');
      };

      scope.$watch('legend', function() {
        if (StoreService.showSymbolZoom()) {
          scope.enableSymbolZoom_();
        }
      });

      scope.$on(oerebEventSymbolZoomEnabled, function(evt, show) {
        if (show) {
          scope.enableSymbolZoom_();
        }
        else {
          scope.disableSymbolZoom_();
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