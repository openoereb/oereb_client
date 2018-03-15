goog.provide('oereb.searchDirective');

goog.require('oereb');
goog.require('oereb.SearchService');
goog.require('oereb.EgridService');
goog.require('oereb.searchResultFilter');
goog.require('oereb.ExtractService');
goog.require('oereb.mapQueryDirective');

/**
 * Query search API.
 * @param {function} $filter The angular filter system.
 * @param {oereb.SearchService} SearchService Angular service for querying search API.
 * @param {oereb.EgridService} EgridService The service to handle egrid related stuff.
 * @param {String} oerebLogoURL The url to the oereb logo.
 * @param {String} blLogoUrl The url to the canton logo.
 * @param {String} oerebEventEgridSelected The
 * @returns {Object} Angular directive definition.
 * @ngInject
 * @ngdoc directive
 * @ngname oerebSearch
 */
oereb.searchDirective = function($filter, SearchService, EgridService, oerebLogoURL, blLogoUrl,
                                 oerebEventEgridSelected) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/search.html',
    scope: {},
    link: function(scope) {

      /** @export {Array} */
      scope.egrids = [];

      /** @export {Array} */
      scope.parcels = [];

      /** @export {Array} */
      scope.addresses = [];

      /** @export {String} */
      scope.searchText = '';

      var reLV03 = new RegExp('^(\\d{6}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{6}(\\.\\d+)?)');
      var reLV95 = new RegExp('^(\\d{7}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{7}(\\.\\d+)?)');
      var reGNSS = new RegExp('^(\\d{1}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{2}(\\.\\d+)?)');

      var egrLoading = false;
      var adrLoading = false;
      var gsLoading = false;

      var clear = function () {
        egrLoading = false;
        adrLoading = false;
        gsLoading = false;
        scope.egrids.length = 0;
        scope.parcels.length = 0;
        scope.addresses.length = 0;
        scope.searchText = '';
      };

      var filter = $filter('searchResult');

      /** @export {String} */
      scope.blLogoUrl = blLogoUrl;

      /** @export {String} */
      scope.oerebLogoUrl = oerebLogoURL;

      scope.$watch('searchText', function(value) {
        if (value !== '') {
          egrLoading = true;
          adrLoading = true;
          gsLoading = true;
          SearchService.searchEgrid(value).then(function(result) {
            egrLoading = false;
            scope.egrids = result.features;
          }, function() {});
          SearchService.searchAddress(value).then(function(result) {
            adrLoading = false;
            scope.addresses = result.features;
          }, function() {});
          SearchService.searchRealEstate(value).then(function(result) {
            gsLoading = false;
            scope.parcels = result.features;
          }, function() {});
        }
      });

      /**
       * Return true, if the search text is a valid LV03 coordinate.
       * @returns {boolean} True, if the search text is a valid LV03 coordinate.
       * @export
       */
      scope.isLV03 = function() {
        return reLV03.test(scope.searchText);
      };

      /**
       * Return true, if the search text is a valid LV95 coordinate.
       * @returns {boolean} True, if the search text is a valid LV95 coordinate.
       * @export
       */
      scope.isLV95 = function() {
        return reLV95.test(scope.searchText);
      };

      /**
       * Return true, if the search text is a valid WGS84 coordinate.
       * @returns {boolean} True, if the search text is a valid WGS84 coordinate.
       * @export
       */
      scope.isGNSS = function() {
        return reGNSS.test(scope.searchText);
      };

      /**
       * Returns the matched coordinate.
       * @param {RegExpExecArray|null} match The coordinate match.
       * @returns {ol.Coordinate|null} The matched coordinate.
       * @private
       */
      scope.parseCoordinateMatch_ = function(match) {
        if (angular.isArray(match)) {
          return [
            parseFloat(match[1]),
            parseFloat(match[4])
          ]
        }
        return null;
      };

      /**
       * Returns the LV03 match.
       * @returns {ol.Coordinate|null} The matched coordinate.
       * @export
       */
      scope.getLV03 = function() {
        return scope.parseCoordinateMatch_(reLV03.exec(scope.searchText));
      };

      /**
       * Returns the LV95 match.
       * @returns {ol.Coordinate|null} The matched coordinate.
       * @export
       */
      scope.getLV95 = function() {
        return scope.parseCoordinateMatch_(reLV95.exec(scope.searchText));
      };

      /**
       * Returns the WGS84 match.
       * @returns {ol.Coordinate|null} The matched coordinate.
       * @export
       */
      scope.getGNSS = function() {
        return scope.parseCoordinateMatch_(reGNSS.exec(scope.searchText));
      };

      /**
       * The function which is used if user selects EGRID out of search results.
       * @param {Object} egrid The EGRID which was selected by the user from search API results.
       * @export
       */
      scope.egridSelect = function(egrid) {
        clear();
        scope.$emit(oerebEventEgridSelected, filter(egrid["properties"]["label"]), true);
      };

      /**
       * The function which is used if user selects an address out of search results.
       * @param {Object} address The address which was selected by the user from search API results.
       * @export
       */
      scope.addressSelect = function (address) {
        var selector = angular.element('#map-query');
        var selectorScope = selector['isolateScope']();
        clear();
        selectorScope.queryAt(address["geometry"]["coordinates"], true);
      };

      /**
       * Queries the real estate at the matched coordinates.
       * @param {ol.Coordinate|null} coordinate The matched coordinate.
       * @export
       */
      scope.coordinateSelect = function(coordinate) {
        if (coordinate !== null) {
          var lv95Coordinate = coordinate;
          var selector = angular.element('#map-query');
          var selectorScope = selector['isolateScope']();
          if (scope.isLV03()) {
            lv95Coordinate = new ol.geom.Point(coordinate).transform('EPSG:21781', 'EPSG:2056')
              .getCoordinates();
          }
          else if (scope.isGNSS()) {
            lv95Coordinate = new ol.geom.Point(coordinate).transform('EPSG:4326', 'EPSG:2056')
              .getCoordinates();
          }
          clear();
          selectorScope.queryAt(lv95Coordinate, true);
        }
      };

      /**
       * The function which is used if user selects a parcel out of search results.
       * @param {Object} parcel The parcel which was selected by the user from search API results.
       * @export
       */
      scope.parcelSelect = function (parcel) {
        var label = filter(parcel['properties']['label']).split(' ');
        var parcel_number = label.pop();
        var municipality_name = label.join(' ');
        SearchService.lookupEgrid(parcel_number, municipality_name, ['grundstueck']).then(
          function(features) {
            var result = features[0];
            if (result.length === 1) {
              clear();
              scope.$emit(oerebEventEgridSelected, result[0].get('egris_egrid'), true);
            }
          }
        );
      };

      /**
       * Clear search text and close results.
       * @export
       */
      scope.close = function() {
        clear();
      };

      /**
       * Returns true if one of the requests is still pending.
       * @returns {boolean} True if one of the requests is still pending.
       * @export
       */
      scope.isLoading = function() {
        return egrLoading || adrLoading || gsLoading;
      };

    }
  }
};

oereb.module.directive('oerebSearch', oereb.searchDirective);
