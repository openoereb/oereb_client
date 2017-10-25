goog.require('oereb.staticExtractDirective');

describe('staticExtractDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
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
      var scope = element.isolateScope();
      expect(element.children('button').length).toBe(1);
      var button = element.children('button').eq(0);
      expect(button.children('i').length).toBe(1);
      expect(button.children('i').eq(0).hasClass('fa-file-pdf-o')).toBe(true);
      expect(button.children('span').length).toBe(1);
      expect(button.children('span').eq(0).hasClass('caret')).toBe(true);
      expect(element.children('ul').length).toBe(1);
      var ul = element.children('ul').eq(0);
      expect(ul.children('li').length).toBe(2);
      for (var i = 0; i < ul.children('li').length; i++) {
        var li = ul.children('li').eq(i);
        expect(li.children('a').length).toBe(1);
        expect(li.children('a').eq(0).text()).toContain(scope.flavours[i].label);
      }
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
      scope.request('reduced');
      $rootScope.$digest();
      expect(icon.hasClass('fa-file-pdf-o')).toBe(false);
      expect(icon.hasClass('fa-spinner')).toBe(true);
      $httpBackend.flush();
      expect(icon.hasClass('fa-file-pdf-o')).toBe(true);
      expect(icon.hasClass('fa-spinner')).toBe(false);
    });

    it('should return the received file', function() {
      $httpBackend.expectGET('http://example.com/extract/full/pdf/CH1234').respond(200, 'content');
      var element = $compile(
        '<oereb-static-extract></oereb-static-extract>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(scope, 'getFile_');
      var icon = element.find('i').eq(0);
      expect(icon.hasClass('fa-file-pdf-o')).toBe(true);
      expect(icon.hasClass('fa-spinner')).toBe(false);
      scope.request('full');
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
