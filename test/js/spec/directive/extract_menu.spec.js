goog.require('oereb.extractMenuDirective');

describe('extractMenuDirective with configured link', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebExternalViewerConfig', angular.toJson({
      url: 'https://dev2.geoview.bl.ch',
      params: [
        'map_x={map_x}',
        'map_y={map_y}',
        'map_zoom={map_zoom}',
        'egrid={egrid}',
        'canton={canton}',
        'fosnr={fosnr}',
        'identdn={identdn}',
        'municipality={municipality}',
        'number={number}'
      ]
    }));
  }));

  var $compile, $location, $rootScope, ExtractService;

  beforeEach(inject(function(_$compile_, _$location_, _$rootScope_, _ExtractService_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    $compile = _$compile_;
    ExtractService = _ExtractService_;
  }));

  describe('template', function() {

    it('should be rendered with link', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      expect(element.hasClass('extract-menu')).toBe(true);
      expect(element.hasClass('btn-group')).toBe(true);
      expect(element.children('button').length).toBe(3);
    });

  });

  describe('hasLinkConfig', function() {

    it('should return true', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.hasLinkConfig()).toBe(true);
    });

  });

  describe('goToExternalViewer', function() {

    it('should open external viewer in new tab', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        EGRID: 'CH1234',
        Canton: 'BL',
        FosNr: 1234,
        IdentDN: 'BL1234',
        Municipality: 'Testwil',
        Number: '1000'
      });
      $location.search('map_x', '1234.0');
      $location.search('map_y', '5678.0');
      $location.search('map_zoom', '3');
      spyOn(window, 'open');
      scope.goToExternalViewer();
      expect(window.open).toHaveBeenCalledWith(encodeURI(
        'https://dev2.geoview.bl.ch?' +
        'map_x=1234.0&' +
        'map_y=5678.0&' +
        'map_zoom=3&' +
        'egrid=CH1234&' +
        'canton=BL&' +
        'fosnr=1234&' +
        'identdn=BL1234&' +
        'municipality=Testwil&' +
        'number=1000'
      ), '_blank');
    });

  });

  describe('providePermalink', function() {

    it('should update permalink URL', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      $location.search('egrid', 'CH1234');
      scope.providePermalink();
      $rootScope.$digest();
      expect($rootScope.permaLink).toEqual($location.absUrl());
    });

  });

});

describe('extractMenuDirective without configured link', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebExternalViewerConfig', angular.toJson({}));
  }));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('template', function() {

    it('should be rendered with link', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      expect(element.hasClass('extract-menu')).toBe(true);
      expect(element.hasClass('btn-group')).toBe(true);
      expect(element.children('button').length).toBe(2);
    });

  });

  describe('hasLinkConfig', function() {

    it('should return false', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.hasLinkConfig()).toBe(false);
    });

  });

  describe('goToExternalViewer', function() {

    it('should do nothing', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(window, 'open');
      scope.goToExternalViewer();
      expect(window.open).toHaveBeenCalledTimes(0);
    });

  });

});
