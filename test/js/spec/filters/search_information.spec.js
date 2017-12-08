goog.require('oereb.searchInformationFilter');

describe('searchInformationFilter', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return invalid input unchanged', function() {
    var invalid = 'invalid';
    expect($filter('searchInformation')(invalid, null)).toBe(invalid);
  });

  it('should return the filtered elements', function() {
    var elements = [
      {
        Title: [
          {
            Text: 'ZZZ',
            Language: 'de'
          }
        ],
        Content: [
          {
            Text: 'four',
            Language: 'de'
          }
        ]
      },
      {
        Title: [
          {
            Text: 'AAA',
            Language: 'de'
          }
        ],
        Content: [
          {
            Text: 'one',
            Language: 'de'
          }
        ]
      }
    ];
    var filtered = $filter('searchInformation')(elements, 'AA');
    expect(angular.isArray(filtered)).toBe(true);
    expect(filtered.length).toBe(1);
    expect(filtered[0].Content[0].Text).toEqual('one');
  });

});