goog.require('oereb.StoreService');

describe('StoreService', function () {

  beforeEach(module('oereb', function() {
    localStorage.removeItem('blOerebHistory');
    localStorage.removeItem('blOerebAvailability');
  }));

  var StoreService;

  beforeEach(inject(function (_StoreService_) {
    StoreService = _StoreService_;
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

    it('should return false', function () {
      expect(StoreService.showAvailability()).toBe(false);
    });

    it('should return true', function () {
      expect(StoreService.showAvailability(true)).toBe(true);
      expect(StoreService.showAvailability()).toBe(true);
    });

  });

});