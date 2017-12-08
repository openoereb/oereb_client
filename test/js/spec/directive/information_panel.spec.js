goog.require('oereb.informationPanelDirective');

describe('informationPanelDirective', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebDefaultLanguage', 'de');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'wms',
      url: 'http://geowms.bl.ch',
      params: {
        LAYERS: 'grundkarte_sw_group'
      }
    }));
  }));

  var $compile, $rootScope, ExtractService, scope;

  beforeEach(inject(function(_$compile_, _$controller_, _$rootScope_, _ExtractService_,
                             _oerebEventEgridSelected_, _oerebEventExtractLoaded_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    var $scope = $rootScope.$new();
    scope = $scope.$new();
    scope.ctrl = _$controller_('MainController', {
      $scope: $scope,
      ExtractService: ExtractService,
      oerebEventEgridSelected: _oerebEventEgridSelected_,
      oerebEventExtractLoaded: _oerebEventExtractLoaded_
    });
  }));

  var extract = {
    PLRCadastreAuthority: 'dummy',
    CantonalLogoRef: 'dummy',
    FederalLogoRef: 'dummy',
    MunicipalityLogoRef: 'dummy',
    BaseData: [],
    GeneralInformation: []
  };

  beforeEach(function() {
    spyOn(ExtractService, 'getExtract').and.returnValue(extract);
  });

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile(
        '<oereb-information-panel information-active="ctrl.informationActive"></oereb-information-panel>'
      )(scope);
      scope.$digest();
      expect(element.find('.close').length).toBe(1);
      var nav = element.children('.nav').eq(0);
      expect(nav.children('li').length).toBe(4);
      expect(nav.find('h4').length).toBe(3);
      expect(nav.find('h4').eq(0).text()).toContain('Allgemein');
      expect(nav.find('h4').eq(1).text()).toContain('Haftungsausschluss');
      expect(nav.find('h4').eq(2).text()).toContain('Glossar');
      var tabs = element.children('.tab-content');
      expect(tabs.length).toBe(1);
      expect(tabs.eq(0).children().length).toBe(1);
      var isoScope = element.isolateScope();
      expect(isoScope.activeTab).toBe(0);
    });

  });

  describe('close', function() {

    it('should close the information panel', function() {
      var element = $compile(
        '<oereb-information-panel information-active="ctrl.informationActive"></oereb-information-panel>'
      )(scope);
      scope.ctrl.informationActive = true;
      scope.$digest();
      var isoScope = element.isolateScope();
      isoScope.search = 'test';
      expect(isoScope.informationActive).toBe(true);
      isoScope.close();
      scope.$digest();
      expect(isoScope.informationActive).toBe(false);
      expect(scope.ctrl.informationActive).toBe(false);
      expect(isoScope.search).toBeUndefined();
    });

  });

  describe('setActiveTab', function() {

    it('should switch the active tab', function() {
      var element = $compile(
        '<oereb-information-panel information-active="ctrl.informationActive"></oereb-information-panel>'
      )(scope);
      scope.$digest();
      var isoScope = element.isolateScope();
      isoScope.search = 'test';
      expect(isoScope.activeTab).toBe(0);
      isoScope.setActiveTab(1);
      expect(isoScope.activeTab).toBe(1);
      expect(isoScope.search).toBeUndefined();
    });

  });

});