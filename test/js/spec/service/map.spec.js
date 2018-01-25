goog.require('oereb');
goog.require('oereb.MapService');

describe('MapService', function() {

  beforeEach(module('oereb', function() {

  }));

  describe('with invalid type', function() {

    var $rootScope, MapService;

    beforeEach(module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'invalid'
      }));
    }));

    beforeEach(inject(function(_$rootScope_, _MapService_) {
      $rootScope = _$rootScope_;
      MapService = _MapService_;
    }));

    it('should return undefined', function() {
      var result;
      MapService.getBaseLayerSource_().then(
        function(source) {
          result = source;
        },
        function(source) {
          result = source;
        }
      );
      $rootScope.$apply();
      expect(result).toEqual('Invalid base layer type');
    });

  });

  describe('with WMS', function() {

    var $rootScope, MapService;

    beforeEach(module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'wms',
        url: 'http://geowms.bl.ch',
        params: {
          LAYERS: 'grundkarte_sw_group'
        }
      }));
    }));

    beforeEach(inject(function(_$rootScope_, _MapService_) {
      $rootScope = _$rootScope_;
      MapService = _MapService_;
    }));

    it('should create a WMS source', function() {
      var source;
      spyOn(MapService, 'getBaseLayerWmsSource_').and.callThrough();
      MapService.getBaseLayerSource_().then(function(result) {
        source = result;
      });
      $rootScope.$apply();
      expect(MapService.getBaseLayerWmsSource_).toHaveBeenCalled();
      expect(source instanceof ol.source.TileWMS).toBe(true);
      expect(source.getUrls().length).toBe(1);
      expect(source.getUrls()[0]).toEqual('http://geowms.bl.ch');
      expect(source.getParams()['LAYERS']).toEqual('grundkarte_sw_group');
    });

    it('should return the map', function() {
      $rootScope.$apply();
      var map = MapService.getMap();
      expect(map instanceof ol.Map).toBe(true);
      expect(map.getLayers().getLength()).toBe(1);
    });

  });

  describe('with WMTS', function() {

    var $httpBackend, MapService;

    beforeEach(module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'wmts',
        url: 'http://tile.dev2.geoview.bl.ch/1.0.0/WMTSCapabilitiesDev2.xml',
        layer: 'grundkarte_sw',
        matrixSet: 'swissgrid',
        projection: 'EPSG:2056',
        style: 'default',
        format: 'image/png'
      }));
    }));

    beforeEach(inject(function(_$httpBackend_, _MapService_) {
      $httpBackend = _$httpBackend_;
      MapService = _MapService_;

      $httpBackend.whenGET('http://tile.dev2.geoview.bl.ch/1.0.0/WMTSCapabilitiesDev2.xml').respond(
        function() {
          var request = new XMLHttpRequest();
          request.open('GET', 'base/test/resources/WMTSCapabilities.xml', false);
          request.send(null);
          return [request.status, request.response, {}];
        }
      );
    }));

    it('should call WMTS method', function() {
      spyOn(MapService, 'getBaseLayerWmtsSource_').and.callThrough();
      MapService.getBaseLayerSource_().then(function() {}, function() {});
      expect(MapService.getBaseLayerWmtsSource_).toHaveBeenCalled();
    });

    it('should create a WMTS source', function(done) {
      MapService.getBaseLayerWmtsSource_().then(function(source) {
        expect(source instanceof ol.source.WMTS).toBe(true);
        expect(source.getUrls().length).toBe(5);
        expect(source.getTileGrid().getResolutions().length).toBe(32);
        done();
      });
      $httpBackend.flush();
    });

  });

  describe('method', function() {

    var MapService;

    beforeEach(module('oereb', function($provide) {
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

    describe('clearLayers', function() {

      it('should clear the list of layers', function() {
        var layers = [
          new ol.layer.Vector({
            source: new ol.source.Vector()
          }),
          new ol.layer.Vector({
            source: new ol.source.Vector()
          })
        ];
        spyOn(MapService.map_, 'removeLayer');
        spyOn(layers, 'splice');
        spyOn(MapService.realEstateLayer_, 'setMap');
        MapService.topicLayers_ = layers;
        angular.forEach(layers, function(layer) {
          MapService.map_.addLayer(layer);
        });
        MapService.clearLayers();
        expect(MapService.map_.removeLayer).toHaveBeenCalledWith(layers[0]);
        expect(MapService.map_.removeLayer).toHaveBeenCalledWith(layers[1]);
        expect(layers.splice).toHaveBeenCalledTimes(2);
        expect(MapService.realEstateLayer_.setMap).toHaveBeenCalledWith(null);
      });

    });

    describe('addTopicLayers', function() {

      it('should update the list of topic layers', function() {
        var viewServices = [
          {
            topic: 'topic1',
            url: 'http://example.com/wms',
            params: {
              LAYERS: 'layer1'
            }
          },
          {
            topic: 'topic2',
            url: 'http://example.com/wms',
            params: {
              LAYERS: 'layer1'
            }
          }
        ];
        MapService.addTopicLayers(viewServices);
        expect(MapService.topicLayers_.length).toBe(2);
        for (var i = 0; i < viewServices.length; i++) {
          expect(MapService.topicLayers_[i].get('topic')).toEqual('topic' + (i + 1));
          expect(MapService.topicLayers_[i].getVisible()).toBe(false);
          expect(MapService.topicLayers_[i].getSource().getProjection())
            .toBe(MapService.getMap().getView().getProjection());
          expect(MapService.getMap().getLayers().item(i)).toBe(MapService.topicLayers_[i]);
        }
      });

    });

    describe('updateRealEstate', function() {

      it('should clear the layer on invalid feature', function() {
        spyOn(MapService.realEstateLayer_.getSource(), 'clear');
        spyOn(MapService.realEstateLayer_.getSource(), 'addFeature');
        spyOn(MapService.realEstateLayer_, 'setMap');
        MapService.updateRealEstate('foo');
        expect(MapService.realEstateLayer_.getSource().clear).toHaveBeenCalledTimes(1);
        expect(MapService.realEstateLayer_.getSource().addFeature).toHaveBeenCalledTimes(0);
        expect(MapService.realEstateLayer_.setMap).toHaveBeenCalledWith(MapService.getMap());
      });

      it('should update the real estate', function() {
        var feature = new ol.Feature({
          geometry: new ol.geom.MultiPolygon([[[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]])
        });
        spyOn(MapService.realEstateLayer_.getSource(), 'clear');
        spyOn(MapService.realEstateLayer_.getSource(), 'addFeature');
        spyOn(MapService.realEstateLayer_, 'setMap');
        MapService.updateRealEstate(feature);
        expect(MapService.realEstateLayer_.getSource().clear).toHaveBeenCalledTimes(1);
        expect(MapService.realEstateLayer_.getSource().addFeature).toHaveBeenCalledWith(feature);
        expect(MapService.realEstateLayer_.setMap).toHaveBeenCalledWith(MapService.getMap());
      });

    });

    describe('getTopicLayers', function() {

      it('should return the list of topic layers', function() {
        expect(MapService.getTopicLayers()).toBe(MapService.topicLayers_);
      });

    });

  });

});