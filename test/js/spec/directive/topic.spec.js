goog.require('oereb.topicDirective');

describe('topicDirective', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'wms',
      url: 'http://geowms.bl.ch',
      params: {
        LAYERS: 'grundkarte_sw_group'
      }
    }));
  }));

  var $compile, $rootScope, $scope, $timeout, ExtractService, MapService, layer;

  var themes = [
    {
      Text: {
        Text: 'Nutzungsplanung',
        Language: 'de'
      },
      Code: 'LandUsePlans'
    },
    {
      Text: {
        Text: 'Projektierungszonen Nationalstrassen',
        Language: 'de'
      },
      Code: 'MotorwaysProjectPlaningZones'
    }
  ];

  beforeEach(inject(function(_$compile_, _$controller_, _$rootScope_, _$timeout_, _ExtractService_,
                             _MapService_, _oerebEventExtractLoaded_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    ExtractService = _ExtractService_;
    MapService = _MapService_;
    $scope = $rootScope.$new();
    $scope.topicCtrl = _$controller_('TopicController', {
      $scope: $scope,
      ExtractService: _ExtractService_,
      oerebEventExtractLoaded: _oerebEventExtractLoaded_
    });
    $scope.theme = themes[0];
    layer = new ol.layer.Image({
      source: new ol.source.ImageCanvas({})
    });
    layer.set('topic', themes[0].Code);
    MapService.topicLayers_.push(layer);
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getConcernedThemes').and.returnValue(themes);
  });

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.$digest();
      expect(element.children('.panel').length).toBe(1);
      var panel = element.children('.panel').eq(0);
      expect(panel.hasClass('panel-default')).toBe(true);
      var panelHeading = panel.children('.panel-heading').eq(0);
      expect(panelHeading.find('strong').length).toBe(1);
      expect(panelHeading.find('strong').eq(0).text()).toContain(themes[0]['Text']['Text']);
      expect(panel.children('.collapse').length).toBe(1);
      expect(panel.find('.opacity-control').length).toBe(1);
      expect(panel.find('.opacity-label').length).toBe(1);
      expect(panel.find('.opacity-value').length).toBe(1);
      expect(panel.find('input').length).toBe(1);
      expect(panel.find('input').first().attr('type')).toEqual('range');
    });

  });

  describe('link function', function() {

    it('should initialize the directive', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.$digest();
      var scope = element.isolateScope();
      expect(scope.layer instanceof ol.layer.Image).toBe(true);
      expect(scope.layer.get('topic')).toEqual(themes[0].Code);
      expect(scope.opacity).toBe(100);
    });

  });

  describe('select', function() {

    it('should set the current theme as the selected one', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.topicCtrl.selectedTheme = 'MotorwaysProjectPlaningZones';
      $scope.$digest();
      var scope = element.isolateScope();
      var panel = element.children('.panel').eq(0);
      expect(panel.hasClass('panel-default')).toBe(true);
      scope.select();
      $scope.$digest();
      expect(panel.hasClass('panel-primary')).toBe(true);
      expect($scope.topicCtrl.selectedTheme).toEqual('LandUsePlans');
    });

  });

  describe('isSelected', function() {

    it('should return true if the theme is currently selected', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.topicCtrl.selectedTheme = 'LandUsePlans';
      $scope.$digest();
      var scope = element.isolateScope();
      expect(scope.isSelected()).toBe(true);
    });

    it('should return false if the theme is currently not selected', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.topicCtrl.selectedTheme = 'MotorwaysProjectPlaningZones';
      $scope.$digest();
      var scope = element.isolateScope();
      expect(scope.isSelected()).toBe(false);
    });

  });

  describe('collapsible events', function() {

    it('should switch the badge icon', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.$digest();
      var scope = element.isolateScope();
      expect(scope.badgeIcon).toEqual('fa-chevron-down');
      var collapsible = element.find('.collapse').eq(0);
      collapsible.trigger('show.bs.collapse');
      $timeout.flush();
      expect(scope.badgeIcon).toEqual('fa-chevron-up');
      collapsible.trigger('hide.bs.collapse');
      $timeout.flush();
      expect(scope.badgeIcon).toEqual('fa-chevron-down');
    });

  });

  describe('opacity watcher', function() {

    it('should update the layer\'s opacity', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )($scope);
      $scope.$digest();
      var scope = element.isolateScope();
      expect(scope.opacity).toBe(100);
      spyOn(layer, 'setOpacity');
      scope.opacity = 50;
      $scope.$digest();
      expect(layer.setOpacity).toHaveBeenCalledWith(0.5);
    });

  });

});
