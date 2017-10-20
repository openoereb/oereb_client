goog.require('oereb.responsibleOfficesDirective');

describe('responsibleOfficesDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, ExtractService;

  var data = [
    {
      Name: [
        {
          Text: 'Amt1',
          Language: 'de'
        }
      ],
      OfficeAtWeb: 'link1'
    },
    {
      Name: [
        {
          Text: 'Amt2',
          Language: 'de'
        }
      ],
      OfficeAtWeb: 'link2'
    }
  ];

  beforeEach(inject(function(_$compile_, _$rootScope_, _ExtractService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getResponsibleOffices').and.returnValue(data);
  });

  describe('template', function() {

    it('should be rendered', function() {
      $rootScope.themeCode = 'test';
      var element = $compile(
        '<oereb-responsible-offices theme-code="::themeCode"></oereb-responsible-offices>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(ExtractService.getResponsibleOffices).toHaveBeenCalledWith('test');
      expect(scope.data.length).toBe(2);
      var dt = element.find('dt');
      expect(dt.length).toBe(1);
      expect(dt.eq(0).text()).toContain('Zuständige Stellen');
      var dd = element.find('dd');
      expect(dd.length).toBe(2);
      expect(dd.eq(0).children('a').eq(0).text()).toContain(data[0].Name[0].Text);
      expect(dd.eq(0).children('a').eq(0).attr('href')).toEqual(data[0].OfficeAtWeb);
      expect(dd.eq(1).children('a').eq(0).text()).toContain(data[1].Name[0].Text);
      expect(dd.eq(1).children('a').eq(0).attr('href')).toEqual(data[1].OfficeAtWeb);
    });

  });

});
