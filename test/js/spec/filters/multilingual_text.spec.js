goog.require('oereb.multilingualTextFilter');

describe('multilingualTextFilter', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return the specified language', function() {
    var text = [
      {
        Language: 'de',
        Text: 'german'
      },
      {
        Language: 'fr',
        Text: 'french'
      },
      {
        Language: 'it',
        Text: 'italian'
      }
    ];
    var filter = $filter('multilingualText');
    expect(filter(text, 'de')).toEqual('german');
    expect(filter(text, 'fr')).toEqual('french');
    expect(filter(text, 'it')).toEqual('italian');
  });

  it('should return the default language', function() {
    var text = [
      {
        Language: 'fr',
        Text: 'french'
      },
      {
        Language: 'de',
        Text: 'german'
      }
    ];
    var filter = $filter('multilingualText');
    expect(filter(text)).toEqual('german');
    expect(filter(text, 'it')).toEqual('german');
  });

  it('should return the first language', function() {
    var text = [
      {
        Language: 'fr',
        Text: 'french'
      },
      {
        Language: 'it',
        Text: 'italian'
      }
    ];
    var filter = $filter('multilingualText');
    expect(filter(text)).toEqual('french');
    expect(filter(text, 'de')).toEqual('french');
  });

});