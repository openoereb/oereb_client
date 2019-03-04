goog.require('oereb.formatFilter');

describe('formatFilter', function() {

  beforeEach(module('oereb'));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return invalid input unchanged', function() {
    var invalid = 1;
    expect($filter('format')(invalid, {})).toBe(1);
  });

  it('should return formatted string', function() {
    expect($filter('format')('test {var1} test {var2} test', {
      var1: 'foo',
      var2: 'bar'
    })).toEqual('test foo test bar test');
  });

  it('should replace key multiple times', function() {
    expect($filter('format')('test {var1} test {var1} test', {
      var1: 'foo'
    })).toEqual('test foo test foo test');
  });

  it('should insert empty strings for missing values', function() {
    expect($filter('format')('test {var1} test {var2} test', {
      var1: 'foo'
    })).toEqual('test foo test  test');
  });

  it('should ignore unused values', function() {
    expect($filter('format')('test {var1} test', {
      var1: 'foo',
      var2: 'bar'
    })).toEqual('test foo test');
  });

});