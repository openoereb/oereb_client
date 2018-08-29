goog.require('oereb.legalDocumentsDirective');

describe('legalDocumentsDirective', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, ExtractService;

  var data = {
    LegalProvision: [
      {
        DocumentType: 'LegalProvision',
        Title: [
          {
            Text: 'RV',
            Language: 'de'
          }
        ],
        OfficialNumber: 'rv.1',
        TextAtWeb: [
          [
            {
              Text: 'http://example.com/rv1',
              Language: 'de'
            }
          ]
        ],
        ArticleNumber: [],
        Article: []
      }
    ],
    Law: [
      {
        DocumentType: 'Law',
        Title: [
          {
            Text: 'G1',
            Language: 'de'
          }
        ],
        OfficialNumber: 'g.1',
        TextAtWeb: [
          [
            {
              Text: 'http://example.com/g1',
              Language: 'de'
            }
          ]
        ],
        ArticleNumber: [
          'A1',
          'A2'
        ],
        Article: []
      }
    ],
    Hint: [
      {
        DocumentType: 'Hint',
        Title: [
          {
            Text: 'H1',
            Language: 'de'
          }
        ],
        OfficialNumber: 'h.1',
        TextAtWeb: [
          [
            {
              Text: 'http://example.com/h1',
              Language: 'de'
            }
          ]
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
      expect(scope.data.LegalProvision.length).toBe(1);
      expect(scope.data.Law.length).toBe(1);
      expect(scope.data.Hint.length).toBe(1);
      var dt = element.find('dt');
      expect(dt.length).toBe(3);
      expect(dt.eq(0).text()).toContain('Rechtsvorschriften');
      expect(dt.eq(1).text()).toContain('Gesetzliche Grundlagen');
      expect(dt.eq(2).text()).toContain('Weitere Informationen und Hinweise');
      var dd = element.find('dd');
      expect(dd.length).toBe(3);
      expect(dd.eq(0).children('span').eq(0).text()).toContain(data.LegalProvision[0].Title[0].Text);
      expect(dd.eq(0).find('ul').eq(0).find('a').eq(0).attr('href'))
        .toEqual(data.LegalProvision[0].TextAtWeb[0][0].Text);
      expect(dd.eq(1).children('span').eq(0).text()).toContain(data.Law[0].Title[0].Text);
      expect(dd.eq(1).find('ul').eq(0).find('a').eq(0).attr('href'))
        .toEqual(data.Law[0].TextAtWeb[0][0].Text);
      expect(dd.eq(2).children('span').eq(0).text()).toContain(data.Hint[0].Title[0].Text);
      expect(dd.eq(2).find('ul').eq(0).find('a').eq(0).attr('href'))
        .toEqual(data.Hint[0].TextAtWeb[0][0].Text);
      var articles = dd.eq(1).children('span');
      expect(articles.length).toBe(3);
      expect(articles.eq(1).text()).toContain('A1');
      expect(articles.eq(2).text()).toContain('A2');
    });

  });

});
