goog.require('oereb.extractMenuDirective');

describe('extractMenuDirective with configured link', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('geoViewConfig', angular.toJson({
      url: 'https://dev2.geoview.bl.ch',
      tree_groups: [
        {
          name: 'Bau- und Strassenlinien',
          layers: [
            'statische_waldgrenzen',
            'baulinien_kommunal_waldabstandslinien'
          ]
        }
      ]
    }));
  }));

  var $compile, $location, $rootScope;

  beforeEach(inject(function(_$compile_, _$location_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    $compile = _$compile_;
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

  describe('goToGeoView', function() {

    it('should open GeoView BL in new tab', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      $location.search('egrid', 'CH1234');
      spyOn(window, 'open');
      scope.goToGeoView();
      expect(window.open).toHaveBeenCalledWith(encodeURI(
        'https://dev2.geoview.bl.ch?wfs_layer=grundstueck&wfs_egris_egrid=CH1234&no_redirect=' +
        '&tree_group_layers_Bau- und Strassenlinien=statische_waldgrenzen,' +
        'baulinien_kommunal_waldabstandslinien&tree_groups=Bau- und Strassenlinien'
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
    $provide.constant('geoViewConfig', angular.toJson({}));
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

  describe('goToGeoView', function() {

    it('should do nothing', function() {
      var element = $compile('<oereb-extract-menu perma-link="permaLink"></oereb-extract-menu>')($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      spyOn(window, 'open');
      scope.goToGeoView();
      expect(window.open).toHaveBeenCalledTimes(0);
    });

  });

});
