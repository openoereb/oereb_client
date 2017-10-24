goog.require('oereb.searchResultFilter');

describe('searchResultFilter', function() {
  beforeEach(angular.mock.module('oereb', function() {

  }));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return clean text without "(Gemeinde)"', function() {
    var text = 'Liestal (Gemeinde)';
    var filter = $filter('searchResult');
    expect(filter(text)).toEqual('Liestal');
  });

  it('should return clean text without "(Grundstück)"', function() {
    var text = 'Liestal 1000 (Grundstück)';
    var filter = $filter('searchResult');
    expect(filter(text)).toEqual('Liestal 1000');
  });

});