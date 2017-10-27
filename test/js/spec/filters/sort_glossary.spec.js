goog.require('oereb.sortGlossaryFilter');

describe('sortGlossaryFilter', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return invalid input unchanged', function() {
    var invalid = 'invalid';
    expect($filter('sortGlossary')(invalid)).toBe(invalid);
  });

  it('should return the sorted elements', function() {
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
      },
      {
        Title: [
          {
            Text: 'BBB',
            Language: 'de'
          }
        ],
        Content: [
          {
            Text: 'two',
            Language: 'de'
          }
        ]
      },
      {
        Title: [
          {
            Text: 'BBB',
            Language: 'de'
          }
        ],
        Content: [
          {
            Text: 'three',
            Language: 'de'
          }
        ]
      }
    ];
    var sorted = $filter('sortGlossary')(elements);
    expect(sorted[0].Content[0].Text).toEqual('one');
    expect(sorted[1].Content[0].Text).toEqual('two');
    expect(sorted[2].Content[0].Text).toEqual('three');
    expect(sorted[3].Content[0].Text).toEqual('four');
  });

});