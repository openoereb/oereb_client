goog.provide('oereb.SearchService');

goog.require('oereb');

/**
 * Angular service to handle a search term passed to GeoViewBL search api.
 * @param {angular.$http} $http Angular service for HTTP requests.
 * @param {angular.$q} $q Angular service for deferrable objects.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngName SearchService
 */
oereb.SearchService = function($http, $q, searchServiceConfig) {

  this.$http_ = $http;
  this.$q_ = $q;
  var config = angular.fromJson(searchServiceConfig);
  this.searchServiceUrl_ = config.url;
  this.limit_ = config.limit

};

/**
 * Query the GeoViewBL search api with the passed term.
 * @param {String} term The term which is used for searching in the GeoViewBL search API.
 * @returns {angular.$q.Promise} Promise search request.
 */
oereb.SearchService.prototype.searchTerm = function(term) {
  var def = this.$q_.defer();
  var urlItems = [
      'limit=' + this.limit_,
      'query=' + term
  ];
  this.$http_.get(this.searchServiceUrl_ + urlItems.join('&')).then(
    function(response) {
        def.resolve(response.data);
    },
    function(response) {
      var error = 'Requesting search term failed: ' + term;
      if (angular.isString(response.data)) {
        error += ' ' + response.data;
      }
      def.reject(error);
    }
  );
  return def.promise;
};

oereb.module.service('SearchService', oereb.SearchService);