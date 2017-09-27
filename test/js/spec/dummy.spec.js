goog.require('oereb');

describe('Module oereb', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('dummy', true);
  }));

  describe('dummy', function() {

    var dummy;

    beforeEach(inject(function(_dummy_) {
      dummy = _dummy_;
    }));

    it('should foo bar', function() {
      expect(dummy).toBe(true);
    });

  });

});