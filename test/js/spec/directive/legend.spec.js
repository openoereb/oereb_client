goog.require('oereb.legendDirective');

describe('legendDirective', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, $timeout, ExtractService;

  var legendEntries = [
    {
      TypeCode: 'legend1',
      Information: [{
        Text: 'Legend 1'
      }],
      AreaShare: 123.4,
      PartInPercent: 12.3,
      SymbolRef: 'http://example.com/symbol1.png'
    },
    {
      TypeCode: 'legend2',
      Information: [{
        Text: 'Legend 2'
      }],
      AreaShare: 567.8,
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
      expect(rows.length).toBe(7);
      expect(rows.eq(0).find('small').length).toBe(2);
      expect(rows.eq(1).children('td').eq(0).text()).toContain(legendEntries[0].Information[0].Text);
      expect(rows.eq(1).children('td').eq(2).text()).toContain('123');
      expect(rows.eq(1).children('td').eq(3).text()).toContain('12.3%');
      expect(rows.eq(2).children('td').eq(0).text()).toContain(legendEntries[1].Information[0].Text);
      expect(rows.eq(2).children('td').eq(2).text()).toContain('568');
      expect(rows.eq(2).children('td').eq(3).text()).toContain('56.7%');
      expect(element.children('div.full-legend-wrapper').length).toBe(1);
      expect(element.children('div.full-legend-wrapper').first().find('img').eq(0).attr('src'))
        .toContain(legendGraphics[0]);
    });

  });

  describe('showGraphics', function() {

    it('should return true if at least one legend graphic is available', function() {
      $rootScope.themeCode = 'test';
      var element = $compile(
        '<oereb-legend theme-code="::themeCode"></oereb-legend>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var wrapper = element.find('div.full-legend-wrapper').first();
      expect(scope.showGraphics()).toBe(true);
      expect(wrapper.hasClass('ng-hide')).toBe(false);
      scope.legend['graphics'] = [];
      scope.$digest();
      expect(scope.showGraphics()).toBe(false);
      expect(wrapper.hasClass('ng-hide')).toBe(true);
      scope.legend = undefined;
      scope.$digest();
      expect(wrapper.hasClass('ng-hide')).toBe(true);
      expect(scope.showGraphics()).toBe(false);
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
      var button = element.find('div.full-legend-wrapper').first().find('span').first();
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
