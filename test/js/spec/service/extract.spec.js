goog.require('oereb');
goog.require('oereb.ExtractService');

describe('ExtractService', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
  }));

  var $httpBackend, ExtractService;

  beforeEach(inject(function(_ExtractService_, _$httpBackend_) {
    ExtractService = _ExtractService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getExtract and getEmbeddable', function() {

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getExtract()).toBeUndefined();
      expect(ExtractService.getEmbeddable()).toBeUndefined();
    });

    it('should return error on failed request', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST')
        .respond(500, 'Test error.');
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Requesting extract for CHTEST failed. Test error.');
    });

    it('should return error on invalid response format', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, {
        GetExtractByIdResponse: 'invalid'
      });
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
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

    it('should return the received extract', function() {
      var data = {
        GetExtractByIdResponse: {
          extract: {
            RealEstate: {
              Number: '1234',
              IdentDN: 'SAMPLE',
              EGRID: 'CH1234'
            }
          },
          embeddable: {
            test: 'Test'
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(response).toEqual(data['GetExtractByIdResponse']);
      expect(ExtractService.getExtract()).toEqual(data['GetExtractByIdResponse']['extract']);
      expect(ExtractService.getEmbeddable()).toEqual(data['GetExtractByIdResponse']['embeddable']);
    });

  });

  describe('getRealEstate', function() {

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getRealEstate()).toBeUndefined();
    });

    it('should return the received real estate', function() {
      var data = {
        GetExtractByIdResponse: {
          extract: {
            RealEstate: {
              Number: '1234',
              IdentDN: 'SAMPLE',
              EGRID: 'CH1234'
            }
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getRealEstate()).toEqual(data['GetExtractByIdResponse']['extract']['RealEstate']);
    });

  });

});