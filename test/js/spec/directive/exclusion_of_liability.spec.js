goog.require('oereb.exclusionOfLiabilityDirective');

describe('exclusionOfLiabilityDirective', function() {

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
      spyOn(ExtractService, 'getExclusionsOfLiability').and.returnValue([
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
        '<oereb-exclusion-of-liability></oereb-exclusion-of-liability>'
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

});
