goog.require('oereb');
goog.require('oereb.realEstateDirective');

describe('realEstateDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
  }));

  var $compile, $rootScope, ExtractService, oerebEventExtractLoaded;

  beforeEach(inject(function(_$compile_, _$rootScope_, _ExtractService_, _oerebEventExtractLoaded_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
  }));

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile('<oereb-real-estate></oereb-real-estate>')($rootScope);
      $rootScope.$digest();
      expect(element.children('h4').length).toBe(1);
      expect(element.children('dl').length).toBe(1);
      var dl = element.children('dl').eq(0);
      expect(dl.children('dt').length).toBe(2);
      expect(dl.children('dd').length).toBe(2);
      expect(dl.children('dt').eq(0).text()).toEqual('EGRID');
      expect(dl.children('dt').eq(1).text()).toEqual('Fläche');
    });

  });

  describe('extract loaded event', function() {

    it('should should update the real extract data', function() {
      var data = {
        Municipality: 'Testwil',
        Number: '1234',
        EGRID: 'CH1234',
        LandRegistryArea: 500
      };
      spyOn(ExtractService, 'getRealEstate').and.returnValue(data);
      var element = $compile('<oereb-real-estate></oereb-real-estate>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$digest();
      expect(scope.data).toEqual(data);
      expect(element.children('h4').eq(0).text()).toContain(
        'Parzelle ' + data.Number + ' in ' + data.Municipality
      );
      expect(element.find('dd').eq(0).text()).toContain(data.EGRID);
      expect(element.find('dd').eq(1).text()).toContain(data.LandRegistryArea);
    });

  });

});
