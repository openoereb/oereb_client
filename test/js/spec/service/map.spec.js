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
      $provide.constant('oerebAvailabilityConfig', angular.toJson({
        url: 'http://geowms.bl.ch',
        layer: 'oereb_availability'
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
      $provide.constant('oerebAvailabilityConfig', angular.toJson({
        url: 'http://geowms.bl.ch',
        layer: 'oereb_availability'
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
      expect(map.getLayers().getLength()).toBe(2);
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
      $provide.constant('oerebAvailabilityConfig', angular.toJson({
        url: 'http://geowms.bl.ch',
        layer: 'oereb_availability'
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

    var $location, $timeout, MapService;

    beforeEach(module('oereb', function($provide) {
      $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'wms',
        url: 'http://geowms.bl.ch',
        params: {
          LAYERS: 'grundkarte_sw_group'
        }
      }));
      $provide.constant('oerebAvailabilityConfig', angular.toJson({
        url: 'http://geowms.bl.ch',
        layer: 'oereb_availability'
      }));
    }));

    beforeEach(inject(function(_$location_, _$timeout_, _MapService_) {
      $location = _$location_;
      $timeout = _$timeout_;
      MapService = _MapService_;
    }));

    describe('updateUrlParams_', function() {

      it('should set the current URL parameters', function () {
        const view = MapService.getMap().getView();
        view.setZoom(10);
        view.setCenter([234.5, 678.9]);
        MapService.updateUrlParams_();
        $timeout.flush();
        expect($location.search()['map_x']).toEqual('234.500');
        expect($location.search()['map_y']).toEqual('678.900');
        expect($location.search()['map_zoom']).toEqual(10);
      });

    });

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
        spyOn(MapService.getMap(), 'removeLayer').and.callThrough();
        spyOn(MapService.getMap(), 'addLayer').and.callThrough();
        var viewServicesByTopic = {
          topic1: [
            {
              url: 'http://example.com/wms',
              params: {
                LAYERS: 'layer1'
              }
            }
          ],
          topic2: [
            {
              url: 'http://example.com/wms',
              params: {
                LAYERS: 'layer1'
              }
            }
          ]
        };
        MapService.addTopicLayers(viewServicesByTopic);
        expect(MapService.topicLayers_.length).toBe(2);
        for (var i = 0; i < viewServicesByTopic.length; i++) {
          expect(MapService.topicLayers_[i].get('topic')).toEqual('topic' + (i + 1));
          expect(MapService.topicLayers_[i].getVisible()).toBe(false);
          expect(MapService.topicLayers_[i].getLayers().item(0).getSource().getProjection())
            .toBe(MapService.getMap().getView().getProjection());
          expect(MapService.getMap().getLayers().item(i)).toBe(MapService.topicLayers_[i]);
        }
        expect(MapService.getMap().removeLayer).toHaveBeenCalledWith(MapService.availabilityLayer_);
        expect(MapService.getMap().addLayer).toHaveBeenCalledWith(MapService.availabilityLayer_);
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

    describe('toggleAvailability', function() {

      it('should switch the availability layer visibility', function() {
        expect(MapService.availabilityLayer_.getVisible()).toBe(true);
        MapService.toggleAvailability();
        expect(MapService.availabilityLayer_.getVisible()).toBe(false);
        MapService.toggleAvailability(false);
        expect(MapService.availabilityLayer_.getVisible()).toBe(false);
        MapService.toggleAvailability(true);
        expect(MapService.availabilityLayer_.getVisible()).toBe(true);
      });

    });

  });

});