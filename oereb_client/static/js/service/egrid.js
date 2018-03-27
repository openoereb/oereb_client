goog.provide('oereb.EgridService');

goog.require('oereb');

/**
 * Angular service to handle the GetEGRID request for the available input types.
 * @param {angular.$http} $http Angular service for HTTP requests.
 * @param {angular.$q} $q Angular service for deferrable objects.
 * @param {angular.Module.constant} oerebApplicationUrl The application base url.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngName EgridService
 */
oereb.EgridService = function($http, $q, oerebApplicationUrl) {

  this.$http_ = $http;
  this.$q_ = $q;
  this.applicationUrl_ = oerebApplicationUrl;

};

/**
 * Query the EGRID for a specified coordinate.
 * @param {ol.Coordinate} coord The coordinate to query the EGRID for.
 * @returns {angular.$q.Promise} Promise for the EGRID request.
 */
oereb.EgridService.prototype.getEgridByCoord = function(coord) {
  var def = this.$q_.defer();
  this.$http_.get(this.applicationUrl_ + 'getegrid.json', {
    params: {
      'XY': '' + coord[0] + ',' + coord[1],
      '_dc': new Date().getTime()
    }
  }).then(
    function(response) {
      if (angular.isArray(response.data['GetEGRIDResponse'])) {
        def.resolve(response.data['GetEGRIDResponse']);
      }
      else {
        def.reject('Invalid response format.');
      }
    },
    function(response) {
      var error = 'Requesting EGRID for (' + coord[0] + ', ' + coord[1] + ') failed.';
      if (angular.isString(response.data)) {
        error += ' ' + response.data;
      }
      def.reject(error);
    }
  );
  return def.promise;
};

oereb.module.service('EgridService', oereb.EgridService);
