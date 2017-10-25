goog.require('oereb.glossaryDirective');

describe('glossaryDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, ExtractService;

  beforeEach(inject(function(_$compile_, _$rootScope_, _ExtractService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
  }));

  describe('template', function() {

    it('should be rendered', function() {
      spyOn(ExtractService, 'getGlossary').and.returnValue([
        {
          Title: [
            {
              Text: 'title1',
              Language: 'de'
            }
          ],
          Content: [
            {
              Text: 'content1',
              Language: 'de'
            }
          ]
        },
        {
          Title: [
            {
              Text: 'title2',
              Language: 'de'
            }
          ],
          Content: [
            {
              Text: 'content2',
              Language: 'de'
            }
          ]
        }
      ]);
      var element = $compile(
        '<oereb-glossary></oereb-glossary>'
      )($rootScope);
      $rootScope.$digest();
      var items = element.find('dl');
      expect(items.length).toBe(2);
      expect(items.eq(0).find('dt').eq(0).text()).toContain('title1');
      expect(items.eq(1).find('dt').eq(0).text()).toContain('title2');
      expect(items.eq(0).find('dd').eq(0).text()).toContain('content1');
      expect(items.eq(1).find('dd').eq(0).text()).toContain('content2');
    });

  });

});
