goog.provide('oereb.MapService');

goog.require('oereb');

/**
 * Angular service for map handling.
 * @param {angular.$q} $q Angular service for deferrable objects.
 * @param {angular.$http} $http Angular service asynchronous requests.
 * @param {Object} oerebBaseLayerConfig The base layer configuration.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname MapService
 */
oereb.MapService = function($q, $http, oerebBaseLayerConfig) {

  this.$q_ = $q;
  this.$http_ = $http;
  this.baseLayerConfig_ = angular.fromJson(oerebBaseLayerConfig);

  // Define LV95 projection
  proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 " +
    "+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
  );

  // Create projection for map
  this.proj_ = new ol.proj.Projection({
    code: 'EPSG:2056',
    units: 'm',
    extent: [2420000, 1030000, 2900000, 1350000]
  });

  // Create map
  var view = new ol.View({
    projection: this.proj_,
    center: [2615000, 1255000],
    zoom: 6
  });
  view.setMinZoom(5);
  view.setMaxZoom(18);
  this.map_ = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({
      attribution: false
    }),
    view: view,
    logo: null
  });

  // Create base layer
  this.getBaseLayerSource_().then(
    function(source) {
      this.baseLayer_ = new ol.layer.Tile({
        preload: Infinity,
        visible: true,
        source: source
      });
      this.map_.addLayer(this.baseLayer_);
    }.bind(this),
    function() {}
  );

};

/**
 * Returns the created map instance.
 * @returns {ol.Map} The created map instance.
 */
oereb.MapService.prototype.getMap = function() {
  return this.map_;
};

/**
 * Creates the source for the base layer.
 * @private
 * @returns {angular.$q.Promise} The promise handling the source request.
 */
oereb.MapService.prototype.getBaseLayerSource_ = function() {
  if (this.baseLayerConfig_['type'].toLowerCase() === 'wms') {
    return this.getBaseLayerWmsSource_();
  }
  else if (this.baseLayerConfig_['type'].toLowerCase() === 'wmts') {
    return this.getBaseLayerWmtsSource_();
  }
  return this.$q_.reject('Invalid base layer type');
};

/**
 * Creates a WMS source for the base layer.
 * @private
 * @returns {angular.$q.Promise} The promise handling the source request.
 */
oereb.MapService.prototype.getBaseLayerWmsSource_ = function() {
  return this.$q_.resolve(new ol.source.TileWMS({
    url: this.baseLayerConfig_['url'],
    params: this.baseLayerConfig_['params'],
    projection: this.proj_
  }));
};

/**
 * Creates a WMTS source for the base layer.
 * @private
 * @returns {angular.$q.Promise} The promise handling the source request.
 */
oereb.MapService.prototype.getBaseLayerWmtsSource_ = function() {
  var def = this.$q_.defer();
  var parser = new ol.format.WMTSCapabilities();
  this.$http_.get(this.baseLayerConfig_['url']).then(
    function(response) {
      var wmtsCaps = parser.read(response.data);
      var wmtsOptions = {};
      angular.forEach(this.baseLayerConfig_, function(value, key) {
        if (key !== 'url') {
          wmtsOptions[key] = value;
        }
      });
      var wmtsConfig = ol.source.WMTS.optionsFromCapabilities(wmtsCaps, wmtsOptions);
      def.resolve(new ol.source.WMTS(wmtsConfig));
    }.bind(this),
    function(response) {
      def.reject(response.data);
    }
  );
  return def.promise;
};

oereb.module.service('MapService', oereb.MapService);
