goog.require('oereb.glossaryDirective');

describe('glossaryDirective', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebDefaultLanguage', 'de');
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
      expect(element.find('h4').length).toBe(2);
      expect(element.find('blockquote').length).toBe(2);
      expect(element.find('h4').eq(0).text()).toContain('title1');
      expect(element.find('h4').eq(1).text()).toContain('title2');
      expect(element.find('p').eq(0).text()).toContain('content1');
      expect(element.find('p').eq(1).text()).toContain('content2');
    });

  });

  describe('extract loaded event', function () {

    it('should update the data', function () {
      spyOn(ExtractService, 'getGlossary');
      $compile(
        '<oereb-glossary></oereb-glossary>'
      )($rootScope);
      $rootScope.$digest();
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$apply();
      expect(ExtractService.getGlossary).toHaveBeenCalledTimes(2);
    });

  });

});
