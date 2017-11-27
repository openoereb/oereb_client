goog.require('oereb.replaceFilter');

describe('replaceFilter', function() {

  beforeEach(module('oereb'));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return invalid input unchanged', function() {
    var invalid = 1;
    expect($filter('replace')(invalid)).toBe(1);
  });

  it('should return replaced string', function() {
    expect($filter('replace')('1_2_3', '_', '-')).toEqual('1-2-3');
  });

});