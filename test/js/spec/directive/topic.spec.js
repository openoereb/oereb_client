goog.require('oereb.topicDirective');

describe('topicDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
  }));

  var $compile, $rootScope, ExtractService, scope;

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

  beforeEach(inject(function(_$compile_, _$controller_, _$rootScope_, _ExtractService_,
                             _oerebEventExtractLoaded_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    var $scope = $rootScope.$new();
    scope = $scope.$new();
    scope.topicCtrl = _$controller_('TopicController', {
      $scope: $scope,
      ExtractService: _ExtractService_,
      oerebEventExtractLoaded: _oerebEventExtractLoaded_
    });
    scope.theme = themes[0];
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getConcernedThemes').and.returnValue(themes);
  });

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )(scope);
      scope.$digest();
      expect(element.children('.panel').length).toBe(1);
      var panel = element.children('.panel').eq(0);
      expect(panel.hasClass('panel-default')).toBe(true);
      var panelHeading = panel.children('.panel-heading').eq(0);
      expect(panelHeading.find('strong').length).toBe(1);
      expect(panelHeading.find('strong').eq(0).text()).toContain(themes[0]['Text']['Text']);
      expect(panel.children('.collapse').length).toBe(1);
    });

  });

  describe('select', function() {

    it('should set the current theme as the selected one', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )(scope);
      scope.topicCtrl.selectedTheme = 'MotorwaysProjectPlaningZones';
      scope.$digest();
      var isoScope = element.isolateScope();
      var panel = element.children('.panel').eq(0);
      expect(panel.hasClass('panel-default')).toBe(true);
      isoScope.select();
      scope.$digest();
      expect(panel.hasClass('panel-primary')).toBe(true);
      expect(scope.topicCtrl.selectedTheme).toEqual('LandUsePlans');
    });

  });

  describe('isSelected', function() {

    it('should return true if the theme is currently selected', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )(scope);
      scope.topicCtrl.selectedTheme = 'LandUsePlans';
      scope.$digest();
      var isoScope = element.isolateScope();
      expect(isoScope.isSelected()).toBe(true);
    });

    it('should return false if the theme is currently not selected', function() {
      var element = $compile(
        '<oereb-topic theme="::theme" selected-theme="topicCtrl.selectedTheme"></oereb-topic>'
      )(scope);
      scope.topicCtrl.selectedTheme = 'MotorwaysProjectPlaningZones';
      scope.$digest();
      var isoScope = element.isolateScope();
      expect(isoScope.isSelected()).toBe(false);
    });

  });

});
