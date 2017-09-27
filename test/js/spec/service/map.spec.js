goog.require('oereb');
goog.require('oereb.MapService');

describe('Module oereb', function() {

  beforeEach(angular.mock.module('oereb', function() {

  }));

  describe('MapService with invalid type', function() {

    var MapService;

    beforeEach(angular.mock.module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'invalid'
      }));
    }));

    beforeEach(inject(function(_MapService_) {
      MapService = _MapService_;
    }));

    it('should return undefined', function() {
      var source = MapService.getBaseLayerSource_();
      expect(source).toBeUndefined();
    });

  });

  describe('MapService with WMS', function() {

    var MapService;

    beforeEach(angular.mock.module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'wms',
        url: 'http://geowms.bl.ch',
        params: {
          LAYERS: 'grundkarte_sw_group'
        }
      }));
    }));

    beforeEach(inject(function(_MapService_) {
      MapService = _MapService_;
    }));

    it('should create a WMS source', function() {
      var source = MapService.getBaseLayerSource_();
      expect(source instanceof ol.source.TileWMS).toBe(true);
      expect(source.getUrls().length).toBe(1);
      expect(source.getUrls()[0]).toEqual('http://geowms.bl.ch');
      expect(source.getParams()['LAYERS']).toEqual('grundkarte_sw_group');
    });

    it('should return the map', function() {
      var map = MapService.getMap();
      expect(map instanceof ol.Map).toBe(true);
      expect(map.getLayers().getLength()).toBe(1);
    });

  });

  describe('MapService with WMTS', function() {

    var MapService;

    beforeEach(angular.mock.module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'wmts',
        version: '1.0.0',
        urls: [
          'http://tile.geoview.bl.ch/1.0.0/{layer}/{style}/{time}/{TileMatrixSet}/{TileMatrix}/{TileRow}' +
          '/{TileCol}.png'
        ],
        layer: 'grundkarte_sw',
        format: 'image/png',
        style: 'default',
        matrix_set: 'swissgrid',
        request_encoding: 'REST',
        dimensions: {
          time: 9999
        },
        resolutions: [4000, 3750, 3500]
      }));
    }));

    beforeEach(inject(function(_MapService_) {
      MapService = _MapService_;
    }));

    it('should create a WMTS source', function() {
      var source = MapService.getBaseLayerSource_();
      var url = 'http://tile.geoview.bl.ch/1.0.0/{layer}/{style}/{time}/{TileMatrixSet}/{TileMatrix}' +
        '/{TileRow}/{TileCol}.png';
      expect(source instanceof ol.source.WMTS).toBe(true);
      expect(source.getUrls().length).toBe(1);
      expect(source.getUrls()[0]).toEqual(url);
      expect(source.getTileGrid().getResolutions().length).toBe(3);
    });

  });

});