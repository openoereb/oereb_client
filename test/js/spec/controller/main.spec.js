goog.require('oereb');
goog.require('oereb.MainController');

describe('MainController', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
        type: 'wms',
        url: 'http://geowms.bl.ch',
        params: {
          LAYERS: 'grundkarte_sw_group'
        }
      }));
  }));

  var $controller, $httpBackend, $rootScope, ExtractService, MapService, oerebEventEgridSelected,
    oerebEventExtractLoaded;

  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _ExtractService_, _MapService_,
                             _oerebEventEgridSelected_, _oerebEventExtractLoaded_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    MapService = _MapService_;
    oerebEventEgridSelected = _oerebEventEgridSelected_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var getMainController = function() {
    return $controller('MainController', {
      $scope: $rootScope.$new(),
      ExtractService: ExtractService,
      MapService: MapService,
      oerebEventEgridSelected: oerebEventEgridSelected,
      oerebEventExtractLoaded: oerebEventExtractLoaded
    });
  };

  var data = {
    GetExtractByIdResponse: {
      extract: {
        RealEstate: {
          Number: '1234',
          IdentDN: 'SAMPLE',
          EGRID: 'CH1234'
        }
      },
      embeddable: {
        test: 'Test'
      }
    }
  };

  it('should be initialized correctly', function() {
    var controller = getMainController();
    expect(controller.extractActive).toBe(false);
  });

  describe('EGRID selected event', function() {

    it('should call the extract service', function() {
      getMainController();
      spyOn(ExtractService, 'queryExtractById').and.callThrough();
      $rootScope.$broadcast(oerebEventEgridSelected);
      expect(ExtractService.queryExtractById).toHaveBeenCalled();
    });

    it('should show the extract', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      spyOn(ExtractService, 'getExtract').and.returnValue('Test');
      var ctrl = getMainController();
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect(ctrl.extractActive).toBe(true);
    });

    it('should show the extract and center', function() {
      var view = MapService.getMap().getView();
      spyOn(view, 'fit');
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      spyOn(ExtractService, 'getExtract').and.returnValue('Test');
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        Limit: {
          coordinates: []
        }
      });
      var ctrl = getMainController();
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST', true);
      $httpBackend.flush();
      expect(ctrl.extractActive).toBe(true);
      expect(view.fit).toHaveBeenCalled();
    });

    it('should hide the extract on invalid data', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, 'Test');
      spyOn(ExtractService, 'getExtract').and.returnValue(undefined);
      var ctrl = getMainController();
      ctrl.extractActive = true;
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect(ctrl.extractActive).toBe(false);
    });

    it('should hide the extract on error', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(500, 'Test');
      var ctrl = getMainController();
      ctrl.extractActive = true;
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect(ctrl.extractActive).toBe(false);
    });

    it('should broadcast extract loaded event', function() {
      spyOn($rootScope, '$broadcast').and.callThrough();
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      spyOn(ExtractService, 'getExtract').and.returnValue('Test');
      getMainController();
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect($rootScope.$broadcast).toHaveBeenCalledWith(oerebEventExtractLoaded);
    });

  });

});