goog.require('oereb.legendDirective');

describe('legendDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
  }));

  var $compile, $rootScope, ExtractService;

  var legendEntries = [
    {
      TypeCode: 'legend1',
      Information: [{
        Text: 'Legend 1'
      }],
      Area: 123.4,
      PartInPercent: 12.3,
      SymbolRef: 'http://example.com/symbol1.png'
    },
    {
      TypeCode: 'legend2',
      Information: [{
        Text: 'Legend 2'
      }],
      Area: 567.8,
      PartInPercent: 56.7,
      SymbolRef: 'http://example.com/symbol2.png'
    }
  ];

  beforeEach(inject(function(_$compile_, _$rootScope_, _ExtractService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getLegend').and.returnValue(legendEntries);
  });

  describe('template', function() {

    it('should be rendered', function() {
      $rootScope.themeCode = 'test';
      var element = $compile(
        '<oereb-legend theme-code="::themeCode"></oereb-legend>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(ExtractService.getLegend).toHaveBeenCalledWith('test');
      expect(scope.legendEntries.length).toBe(2);
      var rows = element.find('.row');
      expect(rows.length).toBe(3);
      expect(rows.eq(0).find('small').length).toBe(3);
      expect(rows.eq(1).children('div').eq(0).text()).toContain(legendEntries[0].Information[0].Text);
      expect(rows.eq(1).children('div').eq(2).text()).toContain(legendEntries[0].Area);
      expect(rows.eq(1).children('div').eq(3).text()).toContain(legendEntries[0].PartInPercent);
      expect(rows.eq(2).children('div').eq(0).text()).toContain(legendEntries[1].Information[0].Text);
      expect(rows.eq(2).children('div').eq(2).text()).toContain(legendEntries[1].Area);
      expect(rows.eq(2).children('div').eq(3).text()).toContain(legendEntries[1].PartInPercent);
    });

  });

});
