goog.require('oereb');
goog.require('oereb.searchDirective');
goog.require('oereb.mapQueryDirective');
goog.require('oereb.SearchService');

describe('searchDirective', function() {
  var oerebLogoUrl = 'http://example.com/oereb_logo';
  var appLogoUrl = 'http://example.com/bl_logo';
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
  var egrids = [{
    properties: {
      label: 'test'
    }
  }, {
    properties: {
      label: 'test1'
    }
  }];
  var parcels = [{
    properties: {
      label: 'test'
    }
  }, {
    properties: {
      label: 'test1'
    }
  }];
  var addresses = [{
    properties: {
      label: 'test'
    }
  }, {
    properties: {
      label: 'test1'
    }
  }];

  beforeEach(module('oereb', function($provide, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $provide.constant('oerebLogoURL', oerebLogoUrl);
    $provide.constant('appLogoUrl', appLogoUrl);
    $provide.constant('searchServiceConfig', searchServiceConfigMock);
    $provide.constant('wfsFilterServiceUrl', 'http://example.com/wfs_filter_service');
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
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

  var $compile, $httpBackend, $rootScope, SearchService;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _SearchService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    SearchService = _SearchService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.egrids = egrids;
      scope.parcels = parcels;
      scope.addresses = addresses;
      $rootScope.$digest();
      expect(element.children('img').length).toBe(2);
      expect(element.children('img').eq(0).attr('src')).toEqual(oerebLogoUrl);
      expect(element.children('img').eq(1).attr('src')).toEqual(appLogoUrl);
      expect(element.find('.list-group').eq(0).find('button').length).toBe(9);
    });
  });

  describe('egrids', function() {

    it('should be empty array', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.egrids).toEqual([]);
    });

  });

  describe('parcels', function() {

    it('should be empty array', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.parcels).toEqual([]);
    });
  });

  describe('addresses', function() {

    it('should be empty array', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.addresses).toEqual([]);
    });
  });

  describe('search string', function() {

    it('should be empty string', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.searchText).toEqual('');
    });
  });

  describe('appLogoUrl', function() {

    it('should be url', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.appLogoUrl).toEqual(appLogoUrl);
    });
  });

  describe('oerebLogoUrl', function() {

    it('should be url', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();

      expect(scope.oerebLogoUrl).toEqual(oerebLogoUrl);
    });
  });

  describe('egridSelect', function() {

    it('should emit listener and clear values', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(scope, '$emit');
      scope.egridSelect({properties: {label: 'CH1234 (this should be removed)'}});
      expect(scope.$emit).toHaveBeenCalledWith('oereb-event-egrid-selected', 'CH1234', true);
      expect(scope.egrids).toEqual([]);
      expect(scope.parcels).toEqual([]);
      expect(scope.addresses).toEqual([]);
      expect(scope.searchText).toEqual('');
    });
  });

  describe('addressSelect', function() {

    it('should call queryAt and clear values', function() {
      // Compile element
      var selector = $compile('<oereb-map-query id="map-query"></oereb-map-query>')($rootScope);
      // force digest cycle for preparing angular mechanism
      $rootScope.$digest();
      // add element to the document body to have it prepared for further testing
      $(document.body).append(selector);
      var selectorScope = selector.isolateScope();
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(selectorScope, 'queryAt');
      scope.addressSelect({geometry: {coordinates: [100, 100]}});
      expect(selectorScope.queryAt).toHaveBeenCalledWith([100, 100], true);
      expect(scope.egrids).toEqual([]);
      expect(scope.parcels).toEqual([]);
      expect(scope.addresses).toEqual([]);
      expect(scope.searchText).toEqual('');
    });
  });
  describe('parcelSelect', function() {

    it('should call search service with prepared parcel', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(SearchService, 'lookupEgrid').and.callThrough();
      scope.parcelSelect({properties: {label: 'Liestal 1000 (Grundstück)'}});
      expect(SearchService.lookupEgrid).toHaveBeenCalledWith('1000', 'Liestal', ['grundstueck']);
    });

    it('should call queryAt and clear values', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.parcelSelect({properties: {label: 'Liestal 1000 (Grundstück)'}});
      expect(scope.egrids).toEqual([]);
      expect(scope.parcels).toEqual([]);
      expect(scope.addresses).toEqual([]);
      expect(scope.searchText).toEqual('');
    });

  });

  describe('close', function() {

    it('should clear search text and results', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.egrids = ['a', 'b'];
      scope.parcels = ['a', 'b'];
      scope.addresses = ['a', 'b'];
      scope.searchText = 'test';
      scope.close();
      expect(scope.egrids.length).toBe(0);
      expect(scope.parcels.length).toBe(0);
      expect(scope.addresses.length).toBe(0);
      expect(scope.searchText).toEqual('');
    });

  });

  describe('isLV03', function() {

    it('should return true', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '123456.7 234567.8';
      expect(scope.isLV03()).toBe(true);
    });

    it('should return false', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234.5 2345.6';
      expect(scope.isLV03()).toBe(false);
    });

  });

  describe('isLV95', function() {

    it('should return true', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234567.8 2345678.9';
      expect(scope.isLV95()).toBe(true);
    });

    it('should return false', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234.5 2345.6';
      expect(scope.isLV95()).toBe(false);
    });

  });

  describe('isGNSS', function() {

    it('should return true', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '7.8 45.6';
      expect(scope.isGNSS()).toBe(true);
    });

    it('should return false', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234.5 2345.6';
      expect(scope.isGNSS()).toBe(false);
    });

  });

  describe('parseCoordinateMatch_', function() {

    it('should return coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.parseCoordinateMatch_(['0', '1', '2', '3', '4', '5'])).toEqual([1.0, 4.0]);
    });

    it('should return null', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.parseCoordinateMatch_(null)).toBeNull();
    });

  });

  describe('getLV03', function() {

    it('should return coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '123456.7, 234567.8';
      expect(scope.getLV03()).toEqual([123456.7, 234567.8]);
    });

    it('should return null', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234.5, 2345.6';
      expect(scope.getLV03()).toBeNull();
    });

  });

  describe('getLV95', function() {

    it('should return coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234567.8, 2345678.9';
      expect(scope.getLV95()).toEqual([1234567.8, 2345678.9]);
    });

    it('should return null', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234.5, 2345.6';
      expect(scope.getLV95()).toBeNull();
    });

  });

  describe('getGNSS', function() {

    it('should return coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '7.8, 45.6';
      expect(scope.getGNSS()).toEqual([7.8, 45.6]);
    });

    it('should return null', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.searchText = '1234.5, 2345.6';
      expect(scope.getGNSS()).toBeNull();
    });

  });

  describe('coordinateSelect', function() {

    var coordLV03 = [600500.0, 260500.0];
    var coordLV95 = [2600500.0, 1260500.0];
    var coordGNSS = [7.52620, 47.50660];

    beforeEach(function() {
      var selector = $compile('<oereb-map-query id="map-query"></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      angular.element(document.body).append(selector);
    });

    it('should query with original LV95 coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var selector = angular.element('#map-query');
      var selectorScope = selector['isolateScope']();
      spyOn(scope, 'isLV03').and.returnValue(false);
      spyOn(scope, 'isGNSS').and.returnValue(false);
      spyOn(selectorScope, 'queryAt');
      scope.coordinateSelect(coordLV95);
      expect(selectorScope.queryAt).toHaveBeenCalledWith(coordLV95, true);
    });

    it('should query with transformed LV03 coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var selector = angular.element('#map-query');
      var selectorScope = selector['isolateScope']();
      var transformed = new ol.geom.Point(coordLV03).transform('EPSG:21781', 'EPSG:2056').getCoordinates();
      spyOn(scope, 'isLV03').and.returnValue(true);
      spyOn(scope, 'isGNSS').and.returnValue(false);
      spyOn(selectorScope, 'queryAt');
      scope.coordinateSelect(coordLV03);
      expect(selectorScope.queryAt).toHaveBeenCalledWith(transformed, true);
    });

    it('should query with transformed GNSS coordinate', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var selector = angular.element('#map-query');
      var selectorScope = selector['isolateScope']();
      var transformed = new ol.geom.Point(coordGNSS).transform('EPSG:4326', 'EPSG:2056').getCoordinates();
      spyOn(scope, 'isLV03').and.returnValue(false);
      spyOn(scope, 'isGNSS').and.returnValue(true);
      spyOn(selectorScope, 'queryAt');
      scope.coordinateSelect(coordGNSS);
      expect(selectorScope.queryAt).toHaveBeenCalledWith(transformed, true);
    });

  });

});
