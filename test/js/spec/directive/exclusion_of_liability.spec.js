goog.require('oereb.exclusionOfLiabilityDirective');

describe('exclusionOfLiabilityDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
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
      var exclusions = element.find('.col-xs-6');
      expect(exclusions.length).toBe(2);
      expect(exclusions.eq(0).find('dt').eq(0).text()).toContain('title1');
      expect(exclusions.eq(1).find('dt').eq(0).text()).toContain('title2');
      expect(exclusions.eq(0).find('dd').eq(0).text()).toContain('content1');
      expect(exclusions.eq(1).find('dd').eq(0).text()).toContain('content2');
    });

  });

});
