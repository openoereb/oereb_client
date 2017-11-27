goog.require('oereb');
goog.require('oereb.SearchService');

describe('SearchService', function () {
  var searchServiceConfigMock = {
    api: {
      url: 'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch?',
      limit: 5
    },
    wfs: {
      url: 'http://geowms.bl.ch?',
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

  beforeEach(module('oereb', function ($provide) {
    $provide.constant('searchServiceConfig', searchServiceConfigMock);
    $provide.constant('wfsFilterServiceUrl', 'http://example.com/wfs_filter_service?');
  }));

  var $httpBackend, SearchService;

  beforeEach(inject(function (_$httpBackend_, _SearchService_) {
    SearchService = _SearchService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('searchTerm', function () {

    it('should return error on failed request', function () {
      $httpBackend.expectGET(
        'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch?limit=5&query=adr liest'
      ).respond(500, 'Test error.');
      var response = undefined;
      SearchService.searchTerm('adr liest').then(
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
        'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch?limit=5&query=adr liest'
      ).respond(200, fullTextSearchResponse);
      var response = undefined;
      SearchService.searchTerm('adr liest').then(
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
    it('should return error on failed request', function () {
      $httpBackend.expectGET(
        'http://example.com/wfs_filter_service?limit=5&layer_name=liegenschaft&municipality_name=Liestal&parcel_number=1000'
      ).respond(500, 'Test error.');
      var response = undefined;
      SearchService.searchEgrid(1000, 'Liestal', ['liegenschaft']).then(
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
      SearchService.searchEgrid(1000, 'Liestal', ['selbstrecht']).then(
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
        'http://geowms.bl.ch?'
      ).respond(200, {});
      var feature = new ol.Feature({
        geometry: new ol.geom.Point([100, 100]),
        name: 'My Point'
      });
      feature.set('egris_egrid', 'CH1234');
      spyOn(SearchService.wfsFormatter, 'readFeatures').and.returnValue(feature);
      var response = undefined;
      SearchService.searchEgrid(1000, 'Liestal', ['selbstrecht']).then(
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