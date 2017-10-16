goog.require('oereb');
goog.require('oereb.MapService');

describe('MapService', function() {

  beforeEach(angular.mock.module('oereb', function() {

  }));

  describe('with invalid type', function() {

    var $rootScope, MapService;

    beforeEach(angular.mock.module('oereb', function($provide) {
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

    beforeEach(angular.mock.module('oereb', function($provide) {
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

    beforeEach(angular.mock.module('oereb', function($provide) {
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

});