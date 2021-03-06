goog.require('oereb.MainController');

describe('MainController', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'wms',
      url: 'http://geowms.bl.ch',
      params: {
        LAYERS: 'grundkarte_sw_group'
      }
    }));
    $provide.constant('oerebViewConfig', angular.toJson({
      map_x: 2615000,
      map_y: 1255000,
      map_zoom: 6
    }));
    $provide.constant('oerebAvailabilityConfig', angular.toJson({
      url: 'http://geowms.bl.ch',
      layer: 'oereb_availability'
    }));
    $provide.constant('oerebSupport', angular.toJson({
      office1: 'Test'
    }));
  }));

  var $controller, $httpBackend, $rootScope, $scope, ExtractService, MapService, dc, oerebEventEgridSelected,
    oerebEventExtractClosed, oerebEventExtractLoaded, oerebSupport;

  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _ExtractService_, _MapService_,
                             _oerebSupport_, _oerebEventEgridSelected_, _oerebEventExtractLoaded_,
                             _oerebEventExtractClosed_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    MapService = _MapService_;
    oerebSupport = _oerebSupport_;
    oerebEventEgridSelected = _oerebEventEgridSelected_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
    oerebEventExtractClosed = _oerebEventExtractClosed_;
    $scope = $rootScope.$new();
  }));

  beforeEach(function() {
    jasmine.clock().install();
    var baseTime = new Date(2018, 1, 1);
    jasmine.clock().mockDate(baseTime);
    dc = baseTime.getTime();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var getMainController = function() {
    return $controller('MainController', {
      $scope: $scope,
      ExtractService: ExtractService,
      MapService: MapService,
      oerebSupport: oerebSupport,
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
    expect(controller.extractCollapsed).toBe(false);
    expect(controller.errorActive).toBe(false);
    expect(controller.informationActive).toBe(false);
    expect(controller.loading).toBe(false);
  });

  describe('EGRID selected event', function() {

    beforeEach(function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
    });

    it('should call the extract service', function() {
      getMainController();
      spyOn(ExtractService, 'queryExtractById').and.callThrough();
      $rootScope.$broadcast(oerebEventEgridSelected);
      expect(ExtractService.queryExtractById).toHaveBeenCalled();
    });

    it('should show the extract', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      spyOn(ExtractService, 'getExtract').and.returnValue('Test');
      var ctrl = getMainController();
      expect(ctrl.loading).toBe(false);
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      expect(ctrl.loading).toBe(true);
      $httpBackend.flush();
      expect(ctrl.loading).toBe(false);
      expect(ctrl.extractActive).toBe(true);
    });

    it('should show the extract and center', function() {
      var view = MapService.getMap().getView();
      spyOn(view, 'fit');
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
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

    it('should show the error message on invalid data', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, 'Test');
      spyOn(ExtractService, 'getExtract').and.returnValue(undefined);
      var ctrl = getMainController();
      ctrl.extractActive = true;
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect(ctrl.extractActive).toBe(true);
      expect(ctrl.errorActive).toBe(true);
    });

    it('should show the error message on error', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(500, 'Test');
      var ctrl = getMainController();
      ctrl.extractActive = true;
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect(ctrl.extractActive).toBe(true);
      expect(ctrl.errorActive).toBe(true);
    });

    it('should broadcast extract loaded event', function() {
      spyOn($rootScope, '$broadcast').and.callThrough();
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      spyOn(ExtractService, 'getExtract').and.returnValue('Test');
      getMainController();
      $rootScope.$broadcast(oerebEventEgridSelected, 'CHTEST');
      $httpBackend.flush();
      expect($rootScope.$broadcast).toHaveBeenCalledWith(oerebEventExtractLoaded);
    });

  });

  describe('closeExtract', function() {

    it('should hide the extract panel', function() {
      var ctrl = getMainController();
      ctrl.extractActive = true;
      ctrl.informationActive = true;
      ctrl.errorActive = true;
      ctrl.closeExtract();
      expect(ctrl.extractActive).toBe(false);
      expect(ctrl.informationActive).toBe(false);
      expect(ctrl.errorActive).toBe(false);
    });

    it('should fire event', function() {
      var ctrl = getMainController();
      spyOn($scope, '$broadcast');
      ctrl.closeExtract();
      expect($scope.$broadcast).toHaveBeenCalledWith(oerebEventExtractClosed);
    });

  });

  describe('toggleInformation', function() {

    it('should switch the information panel visibility', function() {
      var ctrl = getMainController();
      expect(ctrl.informationActive).toBe(false);
      ctrl.toggleInformation();
      expect(ctrl.informationActive).toBe(true);
      ctrl.toggleInformation();
      expect(ctrl.informationActive).toBe(false);
    });

  });

});