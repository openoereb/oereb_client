goog.provide('oereb.searchDirective');

goog.require('oereb');
goog.require('oereb.SearchService');

/**
 * Query search API.
 * @param {oereb.SearchService} SearchService Angular service for querying search API.
 * @returns {Object} Angular directive definition.
 * @ngInject
 * @ngdoc directive
 * @ngname oerebSearch
 */
oereb.searchDirective = function(SearchService, oerebLogoURL, blLogoUrl) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/search.html',
    scope: {},
    link: function(scope, element) {
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
    }
  }
};

oereb.module.directive('oerebSearch', oereb.searchDirective);
