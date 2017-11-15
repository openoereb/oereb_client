goog.require('oereb.StoreService');

describe('StoreService', function () {

  beforeEach(angular.mock.module('oereb', function() {

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
      expect(StoreService.addEgrid('CH12345678')).toEqual(['CH12345678']);
    });

    it('should return an array contain only single unique EGRID', function () {
      StoreService.addEgrid('CH12345678');
      expect(StoreService.addEgrid('CH12345678')).toEqual(['CH12345678']);
    });

    it('should return an array contain five unique EGRID', function () {
      StoreService.addEgrid('CH12345678');
      StoreService.addEgrid('CH12345671');
      StoreService.addEgrid('CH12345672');
      StoreService.addEgrid('CH12345673');
      StoreService.addEgrid('CH12345675');
      expect(StoreService.addEgrid('CH12345674').length).toBe(5);
    });
  });
});