goog.require('oereb.staticExtractDirective');

describe('staticExtractDirective', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $httpBackend, $rootScope, ExtractService;

  beforeEach(inject(function(_$compile_, _$httpBackend_, _$rootScope_, _ExtractService_) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
  }));

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile(
        '<oereb-static-extract></oereb-static-extract>'
      )($rootScope);
      $rootScope.$digest();
      expect(element.hasClass('btn')).toBe(true);
      expect(element.attr('type')).toEqual('button');
      expect(element.children('i').length).toBe(1);
    });

  });

  describe('request', function() {

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        EGRID: 'CH1234'
      })
    });

    it('should reset icon on failed request', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/pdf/CH1234').respond(500, 'error');
      var element = $compile(
        '<oereb-static-extract></oereb-static-extract>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      var icon = element.find('i').eq(0);
      expect(icon.hasClass('fa-file-pdf-o')).toBe(true);
      expect(icon.hasClass('fa-spinner')).toBe(false);
      scope.request();
      $rootScope.$digest();
      expect(icon.hasClass('fa-file-pdf-o')).toBe(false);
      expect(icon.hasClass('fa-spinner')).toBe(true);
      $httpBackend.flush();
      expect(icon.hasClass('fa-file-pdf-o')).toBe(true);
      expect(icon.hasClass('fa-spinner')).toBe(false);
    });

    it('should return the received file', function() {
      $httpBackend.expectGET('http://example.com/extract/reduced/pdf/CH1234').respond(200, 'content');
      var element = $compile(
        '<oereb-static-extract></oereb-static-extract>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(scope, 'getFile_');
      var icon = element.find('i').eq(0);
      expect(icon.hasClass('fa-file-pdf-o')).toBe(true);
      expect(icon.hasClass('fa-spinner')).toBe(false);
      scope.request();
      $rootScope.$digest();
      expect(icon.hasClass('fa-file-pdf-o')).toBe(false);
      expect(icon.hasClass('fa-spinner')).toBe(true);
      $httpBackend.flush();
      expect(icon.hasClass('fa-file-pdf-o')).toBe(true);
      expect(icon.hasClass('fa-spinner')).toBe(false);
      expect(scope.getFile_).toHaveBeenCalledWith('content');
    });

  });

});
