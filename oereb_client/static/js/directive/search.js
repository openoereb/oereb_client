goog.provide('oereb.searchDirective');

goog.require('oereb');
goog.require('oereb.SearchService');
goog.require('oereb.EgridService');
goog.require('oereb.searchResultFilter');
goog.require('oereb.ExtractService');

/**
 * Query search API.
 * @param {oereb.SearchService} SearchService Angular service for querying search API.
 * @returns {Object} Angular directive definition.
 * @ngInject
 * @ngdoc directive
 * @ngname oerebSearch
 */
oereb.searchDirective = function($filter, SearchService, oerebLogoURL, blLogoUrl, EgridService,
                                 oerebEventEgridSelected) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/search.html',
    scope: {},
    link: function(scope, element) {
      var clear = function () {
        scope.egrids.length = 0;
        scope.parcels.length = 0;
        scope.addresses.length = 0;
        scope.searchText = undefined;
      }
      var filter = $filter('searchResult');
      scope.blLogoUrl = blLogoUrl;
      scope.oerebLogoUrl = oerebLogoURL;
      scope.$watch('searchText', function(value) {
        SearchService.searchTerm('egr ' + value).then(function(result) {
          scope.egrids = result.features;
        });
        SearchService.searchTerm('adr ' + value).then(function(result) {
          scope.addresses = result.features;
        });
        SearchService.searchTerm('gs ' + value).then(function(result) {
          scope.parcels = result.features;
        });
      });
      scope.egridSelect = function(egrid) {
        clear();
        scope.$emit(oerebEventEgridSelected, filter(egrid.properties.label));
      };
      scope.addressSelect = function (address) {
        EgridService.getEgridByCoord(address.geometry.coordinates).then(function(egridResponse) {
          console.log(egridResponse)
        })
      };
      scope.parcelSelect = function (parcel) {
        var municipality_name = filter(parcel.properties.label).split(' ')[0];
        var parcel_number = filter(parcel.properties.label).split(' ')[1];
        SearchService.searchEgrid(parcel_number, municipality_name, ['liegenschaft', 'selbstrecht']).then(
          function(features) {
            var result = [];
            result = result.concat(features[0], features[1]);
            if (result.length === 1) {
              clear();
              scope.$emit(oerebEventEgridSelected, result[0].get('egris_egrid'));
            }
          }
        );
      };
    }
  }
};

oereb.module.directive('oerebSearch', oereb.searchDirective);
