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
oereb.SearchService = function ($http, $q, searchServiceConfig, wfsFilterServiceUrl) {

  this.$http_ = $http;
  this.$q_ = $q;
  var config = angular.fromJson(searchServiceConfig);
  this.searchServiceUrl_ = config["api"]["url"];
  this.searchServiceLimit_ = config["api"]["limit"];
  this.wfsUrl_ = config["wfs"]["url"];
  if (this.wfsUrl_.indexOf('?') == -1) {
    this.wfsUrl_ = this.wfsUrl_ + '?';
  }
  this.wfsLimit_ = config["wfs"]["limit"];
  this.wfsFilterServiceUrl_ = wfsFilterServiceUrl;
  if (this.wfsFilterServiceUrl_.indexOf('?') == -1) {
    this.wfsFilterServiceUrl_ = this.wfsFilterServiceUrl_ + '?';
  }
  this.wfsFormatter = new ol.format.WFS();

};

/**
 * Query the GeoViewBL search api with the passed term.
 * @param {String} term The term which is used for searching in the GeoViewBL search API.
 * @returns {angular.$q.Promise} Promise search request.
 */
oereb.SearchService.prototype.searchTerm = function (term) {
  var def = this.$q_.defer();
  var urlItems = [
    'limit=' + this.searchServiceLimit_,
    'query=' + term
  ];
  this.$http_.get(this.searchServiceUrl_ + urlItems.join('&')).then(
    function (response) {
      def.resolve(response.data);
    },
    function (response) {
      var error = 'Requesting search term failed: ' + term;
      if (angular.isString(response.data)) {
        error += ' ' + response.data;
      }
      def.reject(error);
    }
  );
  return def.promise;
};

/**
 * Query a WFS for obtaining egrid to combination of parcel number and municipality name.
 * @param {String} parcel_number The parcel number for the WFS query.
 * @param {String} municipality_name The municipality name for the WFS query.
 * @param {Array} layer_names The layer name for the WFS query.
 * @returns {angular.$q.Promise} Promise search request.
 */
oereb.SearchService.prototype.searchEgrid = function (parcel_number, municipality_name, layer_names) {
  var queue = [];
  angular.forEach(layer_names, function (layer_name) {
    var def = this.$q_.defer();
    var urlItems = [
      'limit=' + this.wfsLimit_,
      'layer_name=' + layer_name,
      'municipality_name=' + municipality_name,
      'parcel_number=' + parcel_number
    ];
    this.$http_.get(this.wfsFilterServiceUrl_ + urlItems.join('&')).then(
      function (response) {
        this.$http_({
          method: "POST",
          url: this.wfsUrl_,
          data: response.data
        }).then(function (wfs_response) {
          def.resolve(this.wfsFormatter.readFeatures(wfs_response.data))
        }.bind(this), function (wfs_response) {
          var error = '';
          if (angular.isString(wfs_response.data)) {
            error += ' ' + wfs_response.data;
          }
          def.reject(error);
        })
      }.bind(this),
      function (response) {
        var error = '';
        if (angular.isString(response.data)) {
          error += ' ' + response.data;
        }
        def.reject(error);
      });
    queue.push(def.promise);
  }.bind(this));

  return this.$q_.all(queue);
};

oereb.module.service('SearchService', oereb.SearchService);