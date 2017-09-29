goog.provide('oereb.mapQueryDirective');

goog.require('oereb');
goog.require('oereb.MapService');
goog.require('oereb.EgridService');

/**
 * Query and select EGRIDs on the map.
 * @param {oereb.MapService} MapService Service for map handling.
 * @param {oereb.EgridService} EgridService Service for querying EGRIDs.
 * @returns {Object} Angular directive definition.
 * @ngInject
 * @ngdoc directive
 * @ngname oerebMapQuery
 */
oereb.mapQueryDirective = function($timeout, MapService, EgridService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/map_query.html',
    scope: {},
    link: function(scope, element) {

      /** @export {boolean} */
      scope.visible = false;

      /** @export {boolean} */
      scope.contentVisible = false;

      /** @export {Array} */
      scope.realEstate = [];

      // Get map instance
      scope.map_ = MapService.getMap();

      // Create overlay for popup
      scope.overlay_ = new ol.Overlay({
        position: [0, 0],
        element: element[0]
      });

      scope.map_.addOverlay(scope.overlay_);

      // Add click listener
      scope.map_.on('singleclick', function(evt) {
        var coord = scope.map_.getEventCoordinate(evt.originalEvent);
        scope.moveTo_(coord);
        scope.queryEgrid_(coord);
      });

      /**
       * Move map query to pixel position and show loading indicator.
       * @param {ol.Pixel} pixel The position to move to element to.
       * @private
       */
      scope.moveTo_ = function(pixel) {
        scope.overlay_.setPosition(pixel);
        $timeout(function() {
          scope.visible = true;
          scope.contentVisible = false;
        });
      };

      /**
       * Query EGRID for the specified coordinate.
       * @param {ol.Coordinate} coord The coordinate to query the EGRID for.
       * @private
       */
      scope.queryEgrid_ = function(coord) {
        EgridService.getEgridByCoord(coord).then(
          function(data) {
            scope.realEstate = data;
            $timeout(function() {
              scope.contentVisible = true;
            });
          },
          function() {
            scope.realEstate = [];
            $timeout(function() {
              scope.contentVisible = false;
              scope.visible = false;
            });
            // TODO: display error message
          }
        );
      };

      /**
       * Load the extract for the specified EGRID.
       * @param {string} egrid The EGRID to load the extract for.
       * @export
       */
      scope.select = function() {
        $timeout(function() {
          scope.visible = false;
        });
        // TODO: call extract service
      };

    }
  }
};

oereb.module.directive('oerebMapQuery', oereb.mapQueryDirective);
