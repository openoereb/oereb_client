goog.require('oereb');
goog.require('oereb.realEstateDirective');

describe('realEstateDirective', function() {

  beforeEach(module('oereb', function($provide) {
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
      expect(element.children('div').length).toBe(2);
      var row1 = element.children('div').eq(0);
      expect(row1.children('div.egrid-header').length).toBe(1);
      expect(row1.children('div.egrid-value').length).toBe(1);
      expect(row1.children('div.egrid-header').eq(0).text()).toContain('EGRID');
      var row2 = element.children('div').eq(1);
      expect(row2.children('div.data-header').length).toBe(1);
      expect(row2.children('div.data-value').length).toBe(1);
      expect(row2.children('div.data-header').eq(0).text()).toContain('Fläche');
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
        'Grundstück ' + data.Number + ' in ' + data.Municipality
      );
      expect(element.find('div.egrid-value').eq(0).text()).toContain(data.EGRID);
      expect(element.find('div.data-value').eq(0).text()).toContain(data.LandRegistryArea);
    });

  });

});
