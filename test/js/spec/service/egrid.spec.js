goog.require('oereb');
goog.require('oereb.EgridService');

describe('EgridService', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
  }));

  var $httpBackend, EgridService;

  beforeEach(inject(function(_EgridService_, _$httpBackend_) {
    EgridService = _EgridService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getEgridByCoord', function() {

    it('should return error on failed request', function() {
      $httpBackend.expectGET('http://example.com/getegrid.json?XY=0,0').respond(500, 'Test error.');
      var response = undefined;
      EgridService.getEgridByCoord([0, 0]).then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Requesting EGRID for (0, 0) failed. Test error.');
    });

    it('should return error on invalid response format', function() {
      $httpBackend.expectGET('http://example.com/getegrid.json?XY=0,0').respond(200, {
        GetEGRIDResponse: 'invalid'
      });
      var response = undefined;
      EgridService.getEgridByCoord([0, 0]).then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Invalid response format.');
    });

    it('should return the list of EGRIDs', function() {
      var realEstates = [
        {
          egrid: 'TEST1',
          number: '1',
          identDN: 'T1'
        },
        {
          egrid: 'TEST2',
          number: '2',
          identDN: 'T2'
        }
      ];
      $httpBackend.expectGET('http://example.com/getegrid.json?XY=0,0').respond(200, {
        GetEGRIDResponse: realEstates
      });
      var response = undefined;
      EgridService.getEgridByCoord([0, 0]).then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isArray(response)).toBe(true);
      expect(response).toEqual(realEstates);
    });

  });

});