goog.require('oereb.legendDirective');

describe('legendDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, $timeout, ExtractService;

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

  var legendGraphics = ['http://example.com/wms?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYERS=test'];

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _ExtractService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    ExtractService = _ExtractService_;
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getLegend').and.returnValue({
      'entries': legendEntries,
      'graphics': legendGraphics
    });
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
      expect(scope.legend['entries'].length).toBe(2);
      expect(scope.legend['graphics'].length).toBe(1);
      var rows = element.find('tr');
      expect(rows.length).toBe(4);
      expect(rows.eq(0).find('small').length).toBe(3);
      expect(rows.eq(1).children('td').eq(0).text()).toContain(legendEntries[0].Information[0].Text);
      expect(rows.eq(1).children('td').eq(2).text()).toContain(legendEntries[0].Area);
      expect(rows.eq(1).children('td').eq(3).text()).toContain(legendEntries[0].PartInPercent);
      expect(rows.eq(2).children('td').eq(0).text()).toContain(legendEntries[1].Information[0].Text);
      expect(rows.eq(2).children('td').eq(2).text()).toContain(legendEntries[1].Area);
      expect(rows.eq(2).children('td').eq(3).text()).toContain(legendEntries[1].PartInPercent);
      expect(rows.eq(3).find('img').eq(0).attr('src')).toContain(legendGraphics[0]);
    });

  });

  describe('toggleGraphics', function() {

    it('should show/hide the legend graphics', function(done) {
      $rootScope.themeCode = 'test';
      var element = $compile(
        '<oereb-legend theme-code="::themeCode"></oereb-legend>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var button = element.find('tr').eq(3).find('span').first();
      var collapsible = element.find('.collapse').first();
      expect(button.find('small').first().text()).toContain('vollständige Legende anzeigen');
      expect(button.find('i').first().hasClass('fa-chevron-down')).toBe(true);
      expect(collapsible.hasClass('in')).toBe(false);
      scope.toggleGraphics();
      $timeout.flush();
      setTimeout(function() {
        expect(button.find('small').first().text()).toContain('vollständige Legende verbergen');
        expect(button.find('i').first().hasClass('fa-chevron-up')).toBe(true);
        expect(collapsible.hasClass('in')).toBe(true);
        scope.toggleGraphics();
        $timeout.flush();
        setTimeout(function() {
          expect(button.find('small').first().text()).toContain('vollständige Legende anzeigen');
          expect(button.find('i').first().hasClass('fa-chevron-down')).toBe(true);
          expect(collapsible.hasClass('in')).toBe(false);
          done();
        }, 600);
      }, 600);
    });

  });

});
