goog.provide('oereb.MapService');

goog.require('oereb');

/**
 * Angular service for map handling.
 * @param {angular.$q} $q Angular service for deferrable objects.
 * @param {angular.$http} $http Angular service asynchronous requests.
 * @param {string} oerebBaseLayerConfig The base layer configuration.
 * @param {string} oerebAvailabilityConfig The availability layer configuration.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname MapService
 */
oereb.MapService = function($q, $http, oerebBaseLayerConfig, oerebAvailabilityConfig) {

  this.$q_ = $q;
  this.$http_ = $http;
  this.baseLayerConfig_ = angular.fromJson(oerebBaseLayerConfig);
  this.availabilityConfig_ = angular.fromJson(oerebAvailabilityConfig);

  // Define LV03 projection
  proj4.defs(
    'EPSG:21781',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 ' +
    '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
  );

  // Define LV95 projection
  proj4.defs(
    'EPSG:2056',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 ' +
    '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
  );

  // Create projection for map
  this.proj_ = new ol.proj.Projection({
    code: 'EPSG:2056',
    units: 'm',
    extent: [2420000, 1030000, 2900000, 1350000]
  });

  /**
   * @type {Array.<ol.layer.Image>}
   * @private
   */
  this.topicLayers_ = [];

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.realEstateLayer_ = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      fill: undefined,
      stroke: new ol.style.Stroke({
        color: [255, 0, 0, 0.75],
        width: 7,
        lineCap: 'square',
        lineJoin: 'miter'
      })
    })
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

  // Create availability layer
  this.availabilityLayer_ = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: this.availabilityConfig_['url'],
      params: {
        'LAYERS': this.availabilityConfig_['layer']
      },
      projection: this.proj_
    })
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
      this.map_.addLayer(this.availabilityLayer_);
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

/**
 * Adds the specified view services as topic layers.
 * @param {Object} viewServicesByTopic The view service definition object.
 */
oereb.MapService.prototype.addTopicLayers = function(viewServicesByTopic) {
  this.map_.removeLayer(this.availabilityLayer_);
  var projection = this.map_.getView().getProjection();
  angular.forEach(viewServicesByTopic, function(viewServices, topic) {
    var layers = [];
    for (var i = 0; i < viewServices.length; i++) {
      var opacity = viewServices[i]['opacity'];
      var layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: viewServices[i]['url'],
          params: viewServices[i]['params'],
          projection: projection
        }),
        visible: true,
        opacity: angular.isNumber(opacity) ? opacity : 1.0,
        zIndex: viewServices[i]['zIndex']
      });
      layers.push(layer);
    }
    var group = new ol.layer.Group({
      layers: layers,
      visible: false,
      opacity: 1
    });
    group.set('topic', topic);
    this.topicLayers_.push(group);
    this.map_.addLayer(group);
  }.bind(this));
  this.map_.addLayer(this.availabilityLayer_);
};

/**
 * Updates the real estate layer with the specified feature.
 * @param {ol.Feature} realEstate The real estate feature.
 */
oereb.MapService.prototype.updateRealEstate = function(realEstate) {
  this.realEstateLayer_.getSource().clear();
  if (realEstate instanceof ol.Feature) {
    this.realEstateLayer_.getSource().addFeature(realEstate);
  }
  this.realEstateLayer_.setMap(this.map_);
};

/**
 * Removes all layers from the map.
 */
oereb.MapService.prototype.clearLayers = function() {
  this.realEstateLayer_.setMap(null);
  this.realEstateLayer_.getSource().clear();
  for (var i = this.topicLayers_.length; i > 0; i--) {
    this.map_.removeLayer(this.topicLayers_[i - 1]);
    this.topicLayers_.splice(i - 1, 1);
  }
};

/**
 * Returns the list of topic layers.
 * @returns {Array<ol.layer.Tile>} The list of topic layers.
 */
oereb.MapService.prototype.getTopicLayers = function() {
  return this.topicLayers_;
};

/**
 * Shows/hides the availability layer.
 * @param {boolean|undefined} visible Undefined to switch visibility, true to show and false to hide layer.
 */
oereb.MapService.prototype.toggleAvailability = function(visible) {
  var show = undefined;
  if (angular.isDefined(visible)) {
    show = visible;
  }
  else {
    show = !this.availabilityLayer_.getVisible();
  }
  this.availabilityLayer_.setVisible(show);
};

oereb.module.service('MapService', oereb.MapService);
