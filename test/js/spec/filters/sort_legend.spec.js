goog.require('oereb.sortLegendFilter');

describe('sortLegendFilter', function() {

  beforeEach(module('oereb'));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return invalid input unchanged', function() {
    var invalid = 'invalid';
    expect($filter('sortLegend')(invalid)).toBe(invalid);
  });

  it('should return the sorted elements', function() {
    var elements = [
      {
        id: 'h',
        SubTheme: 'B',
        LengthShare: 23
      },
      {
        id: 'd',
        SubTheme: 'A',
        LengthShare: 9
      },
      {
        id: 'f',
        SubTheme: 'B',
        AreaShare: 321
      },
      {
        id: 'c',
        SubTheme: 'A',
        LengthShare: 10
      },
      {
        id: 'b',
        SubTheme: 'A',
        AreaShare: 90
      },
      {
        id: 'a',
        SubTheme: 'A',
        AreaShare: 100
      },
      {
        id: 'i',
        SubTheme: 'B',
        LengthShare: 17
      },
      {
        id: 'j',
        SubTheme: 'B'
      },
      {
        id: 'e',
        SubTheme: 'A'
      },
      {
        id: 'g',
        SubTheme: 'B',
        AreaShare: 210
      },
      {
        id: 'k',
        SubTheme: 'B'
      }
    ];
    var sorted = $filter('sortLegend')(elements);
    expect(sorted[0].id).toEqual('a');
    expect(sorted[1].id).toEqual('b');
    expect(sorted[2].id).toEqual('c');
    expect(sorted[3].id).toEqual('d');
    expect(sorted[4].id).toEqual('e');
    expect(sorted[5].id).toEqual('f');
    expect(sorted[6].id).toEqual('g');
    expect(sorted[7].id).toEqual('h');
    expect(sorted[8].id).toEqual('i');
    expect(sorted[9].id).toEqual('j');
    expect(sorted[10].id).toEqual('k');
  });

});