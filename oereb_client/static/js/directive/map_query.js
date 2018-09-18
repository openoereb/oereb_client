goog.provide('oereb.mapQueryDirective');

goog.require('oereb');
goog.require('oereb.MapService');
goog.require('oereb.EgridService');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {angular.$timeout} $timeout Angular $timeout service.
 * @param {oereb.MapService} MapService Service for map handling.
 * @param {oereb.EgridService} EgridService Service for querying EGRIDs.
 * @param {string} oerebEventEgridSelected Event name for selected EGRID.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.mapQueryDirective = function($timeout, MapService, EgridService, oerebEventEgridSelected) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/map_query.html',
    scope: {},
    link: function(scope, element) {
      var centerRealEstate = false;

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
        scope.queryAt(coord);
      });

      /**
       * @ngdoc method
       * @name oerebMapQuery#queryAt
       *
       * @description
       *
       * Routine to provide the item picker for selecting unique egrid.
       *
       * @param {ol.Coordinate} coord The position to move to element to.
       * @param {boolean} center Switch for centering map view on the selector or not.
       *
       * @export
       */
      scope.queryAt = function(coord, center) {
        scope.moveTo_(coord);
        scope.queryEgrid_(coord);
        centerRealEstate = center;
        if (center) {
          scope.map_.getView().setCenter(coord);
        }
      };

      /**
       * @ngdoc method
       * @name oerebMapQuery#moveTo_
       *
       * @description
       *
       * Move map query to pixel position and show loading indicator.
       *
       * @param {ol.Coordinate} coord The position to move to element to.
       *
       * @private
       */
      scope.moveTo_ = function(coord) {
        $timeout(function() {
          scope.visible = true;
          scope.contentVisible = false;
          scope.overlay_.setPosition(coord);
        });
      };

      /**
       * @ngdoc method
       * @name oerebMapQuery#queryEgrid_
       *
       * @description
       *
       * Query EGRID for the specified coordinate.
       *
       * @param {ol.Coordinate} coord The coordinate to query the EGRID for.
       *
       * @private
       */
      scope.queryEgrid_ = function(coord) {
        EgridService.getEgridByCoord(coord).then(
          function(data) {
            scope.realEstate = data;
            if (scope.realEstate.length < 2) {
              if (scope.realEstate.length === 1) {
                scope.$emit(oerebEventEgridSelected, scope.realEstate[0]['egrid'], centerRealEstate);
              }
              $timeout(function () {
                scope.contentVisible = false;
                scope.visible = false;
              });
            }
            else {
              $timeout(function () {
                scope.contentVisible = true;
              });
            }
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
       * @ngdoc method
       * @name oerebMapQuery#close
       *
       * @description
       *
       * Close the map query.
       *
       * @export
       */
      scope.close = function() {
        $timeout(function() {
          scope.contentVisible = false;
          scope.visible = false;
        });
      };

      /**
       * @ngdoc method
       * @name oerebMapQuery#select
       *
       * @description
       *
       * Load the extract for the specified EGRID. It uses the switch to recenter the map from
       * centerRealEstate variable.
       *
       * @param {string} egrid The EGRID to load the extract for.
       *
       * @export
       */
      scope.select = function(egrid) {
        $timeout(function() {
          scope.visible = false;
        });
        scope.$emit(oerebEventEgridSelected, egrid, centerRealEstate);
      };

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebMapQuery
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Query and select EGRIDs on the map.
 */
oereb.module.directive('oerebMapQuery', oereb.mapQueryDirective);
