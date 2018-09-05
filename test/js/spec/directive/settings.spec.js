goog.require('oereb.settingsDirective');

describe('settingsDirective', function() {

  beforeEach(module('oereb', function($provide) {
    localStorage.removeItem('blOerebHistory');
    localStorage.removeItem('blOerebAvailability');
    localStorage.removeItem('blOerebSymbolZoom');
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebLocalStoragePrefix', 'bl');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'invalid'
    }));
    $provide.constant('oerebInitialExtentConfig', angular.toJson({
      map_x: 2615000,
      map_y: 1255000,
      map_zoom: 6
    }));
    $provide.constant('oerebAvailabilityConfig', angular.toJson({
      url: 'http://geowms.bl.ch',
      layer: 'oereb_availability'
    }));
  }));

  var $compile, $rootScope, StoreService;

  beforeEach(inject(function(_$compile_, _$rootScope_, _StoreService_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    StoreService = _StoreService_;
  }));

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile('<oereb-settings></oereb-settings>')($rootScope);
      $rootScope.$digest();
      expect(element.find('button').length).toBe(1);
      expect(element.find('ul').length).toBe(1);
      expect(element.find('li').length).toBe(2);
      expect(element.find('li').eq(0).children('a').first().text())
        .toContain('verfügbare Gemeinden anzeigen');
      expect(element.find('li').eq(1).children('a').first().text())
        .toContain('Legendensymbole vergrössern');
    });

  });

  describe('properties', function() {

    it('should be initialized', function() {
      var element = $compile('<oereb-settings></oereb-settings>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.showAvailability).toBe(StoreService.showAvailability());
      expect(scope.showSymbolZoom).toBe(StoreService.showSymbolZoom());
    });

  });

  describe('watcher', function() {

    it('should be update availability', function() {
      var element = $compile('<oereb-settings></oereb-settings>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(StoreService, 'showAvailability');
      scope.showAvailability = !scope.showAvailability;
      $rootScope.$digest();
      expect(StoreService.showAvailability).toHaveBeenCalledWith(scope.showAvailability);
    });

    it('should be update symbol zoom status', function() {
      var element = $compile('<oereb-settings></oereb-settings>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(StoreService, 'showSymbolZoom');
      scope.showSymbolZoom = !scope.showSymbolZoom;
      $rootScope.$digest();
      expect(StoreService.showSymbolZoom).toHaveBeenCalledWith(scope.showSymbolZoom);
    });

  });

});
