goog.require('oereb');
goog.require('oereb.mapQueryDirective');

describe('mapQueryDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'wms',
      url: 'http://geowms.bl.ch',
      params: {
        LAYERS: 'grundkarte_sw_group'
      }
    }));
  }));

  var $compile, $rootScope, $timeout, MapService;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _MapService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    MapService = _MapService_;
  }));

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(element.children().length).toBe(4);
      expect(element.children().eq(0).hasClass('loader-bg')).toBe(true);
      expect(element.children().eq(1).hasClass('content')).toBe(true);
      expect(element.children().eq(2).hasClass('loader')).toBe(true);
      expect(element.children().eq(3).hasClass('icon')).toBe(true);
      expect(scope.visible).toBe(false);
      expect(scope.contentVisible).toBe(false);
      expect(scope.realEstate).toEqual([]);
    });

  });

  describe('select', function() {

    it('should query the extract for the selected EGRID', function() {
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.visible = true;
      scope.select('TEST');
      $timeout.flush();
      expect(scope.visible).toBe(false);
    });

  });

  describe('moveTo', function() {

    it('should show the loading indicator at the specified position', function() {
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.visible).toBe(false);
      scope.moveTo_([100, 200]);
      $timeout.flush();
      expect(scope.visible).toBe(true);
      expect(scope.overlay_.getPosition()).toEqual([100, 200]);
    });

  });

  describe('queryAt', function() {

    it('should decide if map is recentered', function() {
      var view = MapService.getMap().getView();
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(scope, 'moveTo_');
      spyOn(scope, 'queryEgrid_');
      spyOn(view, 'setCenter');
      expect(scope.visible).toBe(false);
      scope.queryAt([100, 200], true);
      expect(scope.moveTo_).toHaveBeenCalledWith([100, 200]);
      expect(scope.queryEgrid_).toHaveBeenCalledWith([100, 200]);
      expect(view.setCenter).toHaveBeenCalledWith([100, 200]);
    });

  });

  describe('queryEgrid', function() {

    var $httpBackend;

    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should close loading indicator on error', function() {
      $httpBackend.expectGET('http://example.com/getegrid.json?XY=0,0').respond(500, 'Test error.');
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.visible = true;
      scope.queryEgrid_([0, 0]);
      $timeout.flush();
      expect(scope.visible).toBe(true);
      expect(scope.contentVisible).toBe(false);
      $httpBackend.flush();
      $timeout.flush();
      expect(scope.visible).toBe(false);
      expect(scope.contentVisible).toBe(false);
    });

    it('should show real estates', function() {
      var realEstates = [
        {
          egrid: 'TEST1',
          number: '1',
          identDN: 'T1'
        },
        {
          egrid: 'TEST2',
          number: '2',
          identDN: 'T2'
        }
      ];
      $httpBackend.expectGET('http://example.com/getegrid.json?XY=0,0').respond(200, {
        GetEGRIDResponse: realEstates
      });
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.visible = true;
      scope.queryEgrid_([0, 0]);
      $timeout.flush();
      expect(scope.visible).toBe(true);
      expect(scope.contentVisible).toBe(false);
      $httpBackend.flush();
      $timeout.flush();
      expect(scope.visible).toBe(true);
      expect(scope.contentVisible).toBe(true);
      var list = element.find('.list-group').eq(0);
      var children = list.children();
      var childCount = children.length;
      expect(childCount).toBe(3);
      for (var i = 0; i < childCount; i++) {
        var child = children.eq(i);
        expect(child.prop("tagName")).toEqual('BUTTON');
        if (i === 0) {
          expect(child.children('span').length).toBe(1);
        }
        else {
          expect(child.text()).toContain('Auszug für Parzelle ' + i);
        }
      }
    });

  });

  describe('close', function() {

    it('should hide the map query', function() {
      var element = $compile('<oereb-map-query></oereb-map-query>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      scope.visible = true;
      scope.contentVisible = true;
      scope.$digest();
      scope.close();
      $timeout.flush();
      expect(scope.visible).toBe(false);
      expect(scope.contentVisible).toBe(false);
    });

  });

});