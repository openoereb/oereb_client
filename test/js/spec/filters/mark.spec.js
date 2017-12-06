goog.require('oereb.markFilter');

describe('markFilter', function() {

  beforeEach(module('oereb'));

  var $filter, $sce;

  beforeEach(inject(function(_$filter_, _$sce_) {
    $filter = _$filter_;
    $sce = _$sce_;
  }));

  it('should return invalid input unchanged', function() {
    expect($sce.getTrustedHtml($filter('mark')('', ''))).toEqual('');
  });

  it('should return marked string', function() {
    expect($sce.getTrustedHtml($filter('mark')('a marked text', 'marked')))
      .toEqual('a <mark>marked</mark> text');
  });

});