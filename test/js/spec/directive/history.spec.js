goog.require('oereb.historyDirective');

describe('historyDirective', function() {

  beforeEach(module('oereb', function($provide) {
    localStorage.removeItem('blOerebHistory');
    localStorage.removeItem('blOerebAvailability');
    localStorage.removeItem('blOerebSymbolZoom');
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebLocalStoragePrefix', 'bl');
  }));

  var $compile, $rootScope, ExtractService, oerebEventEgridSelected, oerebEventExtractLoaded;

  beforeEach(inject(function(_$compile_, _$rootScope_, _ExtractService_, _oerebEventExtractLoaded_,
                             _oerebEventEgridSelected_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    ExtractService = _ExtractService_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
    oerebEventEgridSelected = _oerebEventEgridSelected_;
  }));

  describe('template', function() {
    it('should be rendered', function() {
      var element = $compile('<oereb-history></oereb-history>')($rootScope);
      $rootScope.$digest();
      expect(element.find('button').length).toBe(1);
      expect(element.find('ul').length).toBe(1);
    });
  });

  describe('history', function() {

    it('should be empty array', function() {
      var element = $compile('<oereb-history></oereb-history>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.history).toEqual([]);
    });

    it('should be array with length 1', function() {
      var element = $compile('<oereb-history></oereb-history>')($rootScope);
      $rootScope.$digest();
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        EGRID: 'CH12345678',
        Municipality: 'Testwil',
        Number: 1000
      });
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$apply();
      var scope = element.isolateScope();
      expect(scope.history[0].egrid).toEqual('CH12345678');
      expect(scope.history[0].municipality).toEqual('Testwil');
      expect(scope.history[0].number).toEqual(1000);
    });
  });

  describe('select', function() {
    it('should call queryExtractById with EGRID', function() {
      var element = $compile('<oereb-history></oereb-history>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(scope, '$emit');
      scope.select({egrid: 'CH12345678'});
      expect(scope.$emit).toHaveBeenCalledWith(oerebEventEgridSelected, 'CH12345678', true);
    });
  });
});
