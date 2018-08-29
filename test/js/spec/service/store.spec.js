goog.require('oereb.StoreService');

describe('StoreService', function () {

  beforeEach(module('oereb', function($provide) {
    localStorage.removeItem('blOerebHistory');
    localStorage.removeItem('blOerebAvailability');
    localStorage.removeItem('blOerebSymbolZoom');

    $provide.constant('oerebLocalStoragePrefix', 'bl');
  }));

  var $rootScope, StoreService, oerebEventSymbolZoomEnabled;

  beforeEach(inject(function (_$rootScope_, _StoreService_, _oerebEventSymbolZoomEnabled_) {
    $rootScope = _$rootScope_;
    StoreService = _StoreService_;
    oerebEventSymbolZoomEnabled = _oerebEventSymbolZoomEnabled_;
  }));

  describe('getHistory', function () {

    it('should return an empty array', function () {
      expect(StoreService.getHistory()).toEqual([]);
    });

  });

  describe('addEgrid', function () {

    it('should return an array contain the added EGRID', function () {
      expect(StoreService.addRealEstate({
        egrid: 'CH12345678',
        number: 1000,
        municipality: 'Testwil'
      })).toEqual([{
        egrid: 'CH12345678',
        number: 1000,
        municipality: 'Testwil'
      }]);
    });

    it('should return an array contain only single unique EGRID', function () {
      StoreService.addRealEstate({
        egrid: 'CH12345678',
        number: 1000,
        municipality: 'Testwil'
      });
      expect(StoreService.addRealEstate({
        egrid: 'CH12345678',
        number: 1000,
        municipality: 'Testwil'
      })).toEqual([{
        egrid: 'CH12345678',
        number: 1000,
        municipality: 'Testwil'
      }]);
    });

    it('should return an array contain five unique EGRID', function () {
      StoreService.addRealEstate({
        egrid: 'CH12345678',
        number: 100,
        municipality: 'Oberwil'
      });
      StoreService.addRealEstate({
        egrid: 'CH12345671',
        number: 1,
        municipality: 'Reinach'
      });
      StoreService.addRealEstate({
        egrid: 'CH12345672',
        number: 500,
        municipality: 'Nusshof'
      });
      StoreService.addRealEstate({
        egrid: 'CH12345673',
        number: 25,
        municipality: 'Anwil'
      });
      StoreService.addRealEstate({
        egrid: 'CH12345675',
        number: 1111,
        municipality: 'Bubendorf'
      });
      expect(StoreService.addRealEstate({
        egrid: 'CH12345674',
        number: 1000,
        municipality: 'Testwil'
      }).length).toBe(5);
    });

  });

  describe('showAvailability', function () {

    it('should return true', function () {
      expect(StoreService.showAvailability()).toBe(true);
    });

    it('should return false', function () {
      expect(StoreService.showAvailability(false)).toBe(false);
      expect(StoreService.showAvailability()).toBe(false);
    });

  });

  describe('showSymbolZoom', function() {

    it('should return true', function() {
      expect(StoreService.showSymbolZoom()).toBe(true);
    });

    it('should return false', function() {
      var event = false;
      $rootScope.$on(oerebEventSymbolZoomEnabled, function(evt, show) {
        expect(show).toBe(false);
        event = true;
      });
      expect(StoreService.showSymbolZoom(false)).toBe(false);
      $rootScope.$apply();
      expect(event).toBe(true);
      expect(StoreService.showSymbolZoom()).toBe(false);
    });

  });

});