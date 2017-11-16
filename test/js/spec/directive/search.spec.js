goog.require('oereb');
goog.require('oereb.searchDirective');
goog.require('oereb.mapQueryDirective');
goog.require('oereb.SearchService');

describe('searchDirective', function() {
  var oerebLogoUrl = 'http://example.com/oereb_logo';
  var blLogoUrl = 'http://example.com/bl_logo';
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

  beforeEach(angular.mock.module('oereb', function($provide, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $provide.constant('oerebLogoURL', oerebLogoUrl);
    $provide.constant('blLogoUrl', blLogoUrl);
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
      expect(element.children('img').eq(1).attr('src')).toEqual(blLogoUrl);
      expect(element.find('.list-group').eq(0).find('button').length).toBe(6);
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

  describe('blLogoUrl', function() {

    it('should be url', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.blLogoUrl).toEqual(blLogoUrl);
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
      spyOn(SearchService, 'searchEgrid').and.callThrough();
      scope.parcelSelect({properties: {label: 'Liestal 1000 (Grundstück)'}});
      expect(SearchService.searchEgrid).toHaveBeenCalledWith('1000', 'Liestal', ['liegenschaft', 'selbstrecht']);
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

    /*it('should emit listener and clear values', function() {
      var element = $compile('<oereb-search></oereb-search>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var def = $q.defer();
      spyOn(SearchService, 'searchEgrid').and.returnValue(def.promise);
      spyOn(scope, '$emit');
      $rootScope.$apply();
      def.resolve([[{'egris_egrid': 'CH1234'}], []]);
      scope.parcelSelect({properties: {label: 'Liestal 1000 (Grundstück)'}});
      expect(scope.$emit).toHaveBeenCalledWith('oereb-event-egrid-selected', 'CH1234', true);
      expect(scope.egrids).toEqual([]);
      expect(scope.parcels).toEqual([]);
      expect(scope.addresses).toEqual([]);
      expect(scope.searchText).toEqual('');
    });*/
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

});
