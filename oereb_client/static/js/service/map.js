goog.provide('oereb.MapService');

goog.require('oereb');

/**
 * Angular service for map handling.
 * @param {angular.Service} oerebBaseLayerConfig The base layer configuration.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname MapService
 */
oereb.MapService = function(oerebBaseLayerConfig) {

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

  // Create base layer
  this.baseLayer_ = new ol.layer.Tile({
    preload: Infinity,
    visible: true,
    source: this.getBaseLayerSource_()
  });

  // Create map
  this.map_ = new ol.Map({
    target: 'map',
    layers: [
      this.baseLayer_
    ],
    controls: ol.control.defaults({
      attribution: false
    }),
    view: new ol.View({
      projection: this.proj_,
      center: [2615000, 1255000],
      zoom: 6
    }),
    logo: null
  });

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
 * @returns {ol.source.Tile|undefined} The created base layer source.
 */
oereb.MapService.prototype.getBaseLayerSource_ = function() {
  if (this.baseLayerConfig_['type'].toLowerCase() === 'wms') {
    return this.getBaseLayerWmsSource_();
  }
  else if (this.baseLayerConfig_['type'].toLowerCase() === 'wmts') {
    return this.getBaseLayerWmtsSource_();
  }
  return undefined;
};

/**
 * Creates a WMS source for the base layer.
 * @private
 * @returns {ol.source.TileWMS} The created base layer source.
 */
oereb.MapService.prototype.getBaseLayerWmsSource_ = function() {
  return new ol.source.TileWMS({
    url: this.baseLayerConfig_['url'],
    params: this.baseLayerConfig_['params'],
    projection: this.proj_
  });
};

/**
 * Creates a WMTS source for the base layer.
 * @private
 * @returns {ol.source.WMTS} The created base layer source.
 */
oereb.MapService.prototype.getBaseLayerWmtsSource_ = function() {
  var matrixIds = [];
  for (var i = 0; i < this.baseLayerConfig_['resolutions'].length; i++) {
    matrixIds.push(i);
  }
  return new ol.source.WMTS({
    version: this.baseLayerConfig_['version'],
    layer: this.baseLayerConfig_['layer'],
    format: this.baseLayerConfig_['format'],
    matrixSet: this.baseLayerConfig_['matrix_set'],
    extent: this.proj_.getExtent(),
    style: this.baseLayerConfig_['style'],
    dimensions: this.baseLayerConfig_['dimensions'],
    requestEncoding: this.baseLayerConfig_['request_encoding'],
    projection: this.proj_,
    tileGrid: new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(this.proj_.getExtent()),
      resolutions: this.baseLayerConfig_['resolutions'],
      matrixIds: matrixIds
    }),
    urls: this.baseLayerConfig_['urls']
  });
};

oereb.module.service('MapService', oereb.MapService);
