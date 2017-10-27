goog.require('oereb.legalDocumentsDirective');

describe('legalDocumentsDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, ExtractService;

  var data = {
    LegalProvisions: [
      {
        Title: [
          {
            Text: 'RV',
            Language: 'de'
          }
        ],
        OfficialNumber: 'rv.1',
        TextAtWeb: [
          {
            Text: 'http://example.com/rv1',
            Language: 'de'
          }
        ],
        ArticleNumber: [],
        Article: []
      }
    ],
    Documents: [
      {
        Title: [
          {
            Text: 'G1',
            Language: 'de'
          }
        ],
        OfficialNumber: 'g.1',
        TextAtWeb: [
          {
            Text: 'http://example.com/g1',
            Language: 'de'
          }
        ],
        ArticleNumber: [
          'A1',
          'A2'
        ],
        Article: []
      },
      {
        Title: [
          {
            Text: 'G2',
            Language: 'de'
          }
        ],
        OfficialNumber: 'g.2',
        TextAtWeb: [
          {
            Text: 'http://example.com/g2',
            Language: 'de'
          }
        ],
        ArticleNumber: [],
        Article: []
      }
    ]
  };

  beforeEach(inject(function(_$compile_, _$rootScope_, _ExtractService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getDocuments').and.returnValue(data);
  });

  describe('template', function() {

    it('should be rendered', function() {
      $rootScope.themeCode = 'test';
      var element = $compile(
        '<oereb-legal-documents theme-code="::themeCode"></oereb-legal-documents>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(ExtractService.getDocuments).toHaveBeenCalledWith('test');
      expect(scope.data.LegalProvisions.length).toBe(1);
      expect(scope.data.Documents.length).toBe(2);
      var dt = element.find('dt');
      expect(dt.length).toBe(2);
      expect(dt.eq(0).text()).toContain('Rechtsvorschriften');
      expect(dt.eq(1).text()).toContain('Gesetzliche Grundlagen');
      var dd = element.find('dd');
      expect(dd.length).toBe(3);
      expect(dd.eq(0).children('a').eq(0).text()).toContain(data.LegalProvisions[0].Title[0].Text);
      expect(dd.eq(0).children('a').eq(0).attr('href')).toEqual(data.LegalProvisions[0].TextAtWeb[0].Text);
      expect(dd.eq(1).children('a').eq(0).text()).toContain(data.Documents[0].Title[0].Text);
      expect(dd.eq(1).children('a').eq(0).attr('href')).toEqual(data.Documents[0].TextAtWeb[0].Text);
      expect(dd.eq(2).children('a').eq(0).text()).toContain(data.Documents[1].Title[0].Text);
      expect(dd.eq(2).children('a').eq(0).attr('href')).toEqual(data.Documents[1].TextAtWeb[0].Text);
      var articles = dd.eq(1).children('span');
      expect(articles.length).toBe(2);
      expect(articles.eq(0).text()).toContain('A1');
      expect(articles.eq(1).text()).toContain('A2');
    });

  });

});
