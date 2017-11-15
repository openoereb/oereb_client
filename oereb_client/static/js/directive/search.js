goog.provide('oereb.searchDirective');

goog.require('oereb');
goog.require('oereb.SearchService');
goog.require('oereb.EgridService');
goog.require('oereb.searchResultFilter');
goog.require('oereb.ExtractService');

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
          SearchService.searchTerm('egr ' + value).then(function(result) {
            egrLoading = false;
            scope.egrids = result.features;
          });
          SearchService.searchTerm('adr ' + value).then(function(result) {
            adrLoading = false;
            scope.addresses = result.features;
          });
          SearchService.searchTerm('gs ' + value).then(function(result) {
            gsLoading = false;
            scope.parcels = result.features;
          });
        }

      });

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
        var selectorScope = selector.isolateScope();
        clear();
        selectorScope.queryAt(address["geometry"]["coordinates"], true);
      };

      /**
       * The function which is used if user selects a parcel out of search results.
       * @param {Object} parcel The parcel which was selected by the user from search API results.
       * @export
       */
      scope.parcelSelect = function (parcel) {
        var municipality_name = filter(parcel["properties"]["label"]).split(' ')[0];
        var parcel_number = filter(parcel["properties"]["label"]).split(' ')[1];
        SearchService.searchEgrid(parcel_number, municipality_name, ['liegenschaft', 'selbstrecht']).then(
          function(features) {
            var result = [];
            result = result.concat(features[0], features[1]);
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
