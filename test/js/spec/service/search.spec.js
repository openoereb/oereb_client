goog.require('oereb');
goog.require('oereb.SearchService');

describe('SearchService', function () {
  var searchServiceConfigMock = {
    api: {
      url: 'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch',
      limit: 5
    },
    wfs: {
      url: 'http://geowms.bl.ch',
      limit: 5
    }
  };
  var fullTextSearchResponse = {
    type: "FeatureCollection",
    features: [
      {
        geometry: {
          type: "Point",
          coordinates: [
            2623521.607,
            1258599.86
          ]
        },
        properties: {
          params: null,
          layer_name: "adresse",
          label: "Liestal A22 7 (Adresse)"
        },
        type: "Feature",
        bbox: [
          2623521.607,
          1258599.86,
          2623521.607,
          1258599.86
        ],
        id: 76910509
      },
      {
        geometry: {
          type: "Point",
          coordinates: [
            2621312.368,
            1260386.62
          ]
        },
        properties: {
          params: null,
          layer_name: "adresse",
          label: "Liestal Ahornstrasse 4 (Adresse)"
        },
        type: "Feature",
        bbox: [
          2621312.368,
          1260386.62,
          2621312.368,
          1260386.62
        ],
        id: 76910548
      }]
  };

  beforeEach(module('oereb', function ($provide, $qProvider) {
    $provide.constant('searchServiceConfig', searchServiceConfigMock);
    $provide.constant('wfsFilterServiceUrl', 'http://example.com/wfs_filter_service');
    $qProvider.errorOnUnhandledRejections(false);
  }));

  var $httpBackend, $q, $rootScope, SearchService;

  beforeEach(inject(function (_$httpBackend_, _$q_, _$rootScope_, _SearchService_) {
    SearchService = _SearchService_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('searchTerm_', function () {

    it('should return error on failed request', function () {
      $httpBackend.expectGET(
        'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch?limit=5&query=adr+liest'
      ).respond(500, 'Test error.');
      var response = undefined;
      SearchService.searchTerm_('adr liest').then(
        function (data) {
          response = data;
        },
        function (data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Requesting search term failed: adr liest Test error.');
    });

    it('should return the responded data', function () {
      $httpBackend.expectGET(
        'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch?limit=5&query=adr+liest'
      ).respond(200, fullTextSearchResponse);
      var response = undefined;
      SearchService.searchTerm_('adr liest').then(
        function (data) {
          response = data;
        },
        function (data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(response).toEqual(fullTextSearchResponse);
    });

  });

  describe('searchEgrid', function () {

    it('should reject existing promise', function () {
      var def = $q.defer();
      spyOn(def, 'reject');
      SearchService.egridDef_ = def;
      SearchService.searchEgrid('test');
      expect(def.reject).toHaveBeenCalled();
    });

    it('should resolve with search result', function(done) {
      var def = $q.defer();
      spyOn(SearchService, 'searchTerm_').and.returnValue(def.promise);
      expect(SearchService.egridDef_).toBeUndefined();
      SearchService.searchEgrid('test').then(
        function(result) {
          expect(SearchService.egridDef_).toBeUndefined();
          expect(result).toEqual('result');
          done();
        }
      );
      expect(SearchService.egridDef_).toBeDefined();
      expect(SearchService.searchTerm_).toHaveBeenCalledWith('egr test');
      def.resolve('result');
      $rootScope.$apply();
    });

    it('should reject on failed search', function(done) {
      var def = $q.defer();
      spyOn(SearchService, 'searchTerm_').and.returnValue(def.promise);
      expect(SearchService.egridDef_).toBeUndefined();
      SearchService.searchEgrid('test').then(
        function() {},
        function() {
          expect(SearchService.egridDef_).toBeUndefined();
          done();
        }
      );
      expect(SearchService.egridDef_).toBeDefined();
      expect(SearchService.searchTerm_).toHaveBeenCalledWith('egr test');
      def.reject();
      $rootScope.$apply();
    });

  });

  describe('searchAddress', function () {

    it('should reject existing promise', function () {
      var def = $q.defer();
      spyOn(def, 'reject');
      SearchService.addressDef_ = def;
      SearchService.searchAddress('test');
      expect(def.reject).toHaveBeenCalled();
    });

    it('should resolve with search result', function(done) {
      var def = $q.defer();
      spyOn(SearchService, 'searchTerm_').and.returnValue(def.promise);
      expect(SearchService.addressDef_).toBeUndefined();
      SearchService.searchAddress('test').then(
        function(result) {
          expect(SearchService.addressDef_).toBeUndefined();
          expect(result).toEqual('result');
          done();
        }
      );
      expect(SearchService.addressDef_).toBeDefined();
      expect(SearchService.searchTerm_).toHaveBeenCalledWith('adr test');
      def.resolve('result');
      $rootScope.$apply();
    });

    it('should reject on failed search', function(done) {
      var def = $q.defer();
      spyOn(SearchService, 'searchTerm_').and.returnValue(def.promise);
      expect(SearchService.addressDef_).toBeUndefined();
      SearchService.searchAddress('test').then(
        function() {},
        function() {
          expect(SearchService.addressDef_).toBeUndefined();
          done();
        }
      );
      expect(SearchService.addressDef_).toBeDefined();
      expect(SearchService.searchTerm_).toHaveBeenCalledWith('adr test');
      def.reject();
      $rootScope.$apply();
    });

  });

  describe('searchRealEstate', function () {

    it('should reject existing promise', function () {
      var def = $q.defer();
      spyOn(def, 'reject');
      SearchService.realEstateDef_ = def;
      SearchService.searchRealEstate('test');
      expect(def.reject).toHaveBeenCalled();
    });

    it('should resolve with search result', function(done) {
      var def = $q.defer();
      spyOn(SearchService, 'searchTerm_').and.returnValue(def.promise);
      expect(SearchService.realEstateDef_).toBeUndefined();
      SearchService.searchRealEstate('test').then(
        function(result) {
          expect(SearchService.realEstateDef_).toBeUndefined();
          expect(result).toEqual('result');
          done();
        }
      );
      expect(SearchService.realEstateDef_).toBeDefined();
      expect(SearchService.searchTerm_).toHaveBeenCalledWith('gs test');
      def.resolve('result');
      $rootScope.$apply();
    });

    it('should reject on failed search', function(done) {
      var def = $q.defer();
      spyOn(SearchService, 'searchTerm_').and.returnValue(def.promise);
      expect(SearchService.realEstateDef_).toBeUndefined();
      SearchService.searchRealEstate('test').then(
        function() {},
        function() {
          expect(SearchService.realEstateDef_).toBeUndefined();
          done();
        }
      );
      expect(SearchService.realEstateDef_).toBeDefined();
      expect(SearchService.searchTerm_).toHaveBeenCalledWith('gs test');
      def.reject();
      $rootScope.$apply();
    });

  });

  describe('lookupEgrid', function () {

    it('should return error on failed request', function () {
      $httpBackend.expectGET(
        'http://example.com/wfs_filter_service?limit=5&layer_name=liegenschaft&municipality_name=Liestal&parcel_number=1000'
      ).respond(500, 'Test error.');
      var response = undefined;
      SearchService.lookupEgrid(1000, 'Liestal', ['liegenschaft']).then(
        function (data) {
          response = data;
        },
        function (data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual(' Test error.');
    });

    it('should return error on failed request', function () {
      $httpBackend.expectGET(
        'http://example.com/wfs_filter_service?limit=5&layer_name=selbstrecht&municipality_name=Liestal&parcel_number=1000'
      ).respond(500, 'Test error.');
      var response = undefined;
      SearchService.lookupEgrid(1000, 'Liestal', ['selbstrecht']).then(
        function (data) {
          response = data;
        },
        function (data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual(' Test error.');
    });

    it('should return feature', function () {
      $httpBackend.expectGET(
        'http://example.com/wfs_filter_service?limit=5&layer_name=selbstrecht&municipality_name=Liestal&parcel_number=1000'
      ).respond(200, {});
      $httpBackend.expectPOST(
        'http://geowms.bl.ch'
      ).respond(200, {});
      var feature = new ol.Feature({
        geometry: new ol.geom.Point([100, 100]),
        name: 'My Point'
      });
      feature.set('egris_egrid', 'CH1234');
      spyOn(SearchService.wfsFormatter, 'readFeatures').and.returnValue(feature);
      var response = undefined;
      SearchService.lookupEgrid(1000, 'Liestal', ['selbstrecht']).then(
        function (data) {
          response = data;
        },
        function (data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(response[0].get('egris_egrid')).toEqual('CH1234');
    });

  });

});