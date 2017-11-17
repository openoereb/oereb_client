goog.require('oereb.notConcernedThemeDirective');

describe('notConcernedThemeDirective', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'wms',
      url: 'http://geowms.bl.ch',
      params: {
        LAYERS: 'grundkarte_sw_group'
      }
    }));
  }));

  var $compile, $rootScope, $timeout, ExtractService, oerebEventExtractLoaded, scope;

  beforeEach(inject(function(_$compile_, _$controller_, _$rootScope_, _$timeout_, _ExtractService_,
                             _oerebEventExtractLoaded_, _oerebEventEgridSelected_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    ExtractService = _ExtractService_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
    var $scope = $rootScope.$new();
    scope = $scope.$new();
    scope.ctrl = _$controller_('MainController', {
      $scope: $scope,
      ExtractService: _ExtractService_,
      oerebEventEgridSelected: _oerebEventEgridSelected_,
      oerebEventExtractLoaded: _oerebEventExtractLoaded_
    });
    scope.toggledGroup = undefined;
  }));

  beforeEach(function () {
    spyOn(ExtractService, 'getNotConcernedThemes').and.returnValue([
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
    ]);
  });

  describe('template', function() {

    it('should be rendered', function() {
      var element = $compile(
        '<oereb-not-concerned-theme toggled-group="ctrl.toggledGroup"></oereb-not-concerned-theme>'
      )(scope);
      scope.$digest();
      expect(element.find('h4').length).toBe(1);
      expect(element.find('h4').eq(0).text()).toContain('Nicht betroffene Themen');
      expect(element.find('.collapse').length).toBe(1);
      expect(element.find('.list-group').length).toBe(1);
    });

  });

  describe('extract loaded event', function() {

    it('should render the loaded data', function() {
      var element = $compile(
        '<oereb-not-concerned-theme toggled-group="ctrl.toggledGroup"></oereb-not-concerned-theme>'
      )(scope);
      scope.$digest();
      var isoScope = element.isolateScope();
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$digest();
      expect(isoScope.data.length).toBe(2);
      var listGroup = element.find('.list-group').eq(0);
      expect(listGroup.children('li').length).toBe(2);
      expect(listGroup.children().eq(0).text()).toContain(isoScope.data[0]['Text']['Text']);
      expect(listGroup.children().eq(1).text()).toContain(isoScope.data[1]['Text']['Text']);
    });

  });

  describe('toggle', function() {

    it('should update the toggled group', function() {
      var element = $compile(
        '<oereb-not-concerned-theme toggled-group="ctrl.toggledGroup"></oereb-not-concerned-theme>'
      )(scope);
      scope.$digest();
      var isoScope = element.isolateScope();
      isoScope.data = [1, 2];
      isoScope.toggle();
      scope.$digest();
      expect(isoScope.toggledGroup).toEqual('NotConcernedTheme');
    });

  });

  describe('collapsible events', function() {

    it('should switch the badge icon', function() {
      var element = $compile(
        '<oereb-not-concerned-theme toggled-group="ctrl.toggledGroup"></oereb-not-concerned-theme>'
      )(scope);
      scope.$digest();
      var isoScope = element.isolateScope();
      expect(isoScope.badgeIcon).toEqual('fa-chevron-down');
      var collapsible = element.find('.collapse').eq(0);
      collapsible.trigger('show.bs.collapse');
      $timeout.flush();
      expect(isoScope.badgeIcon).toEqual('fa-chevron-up');
      collapsible.trigger('hide.bs.collapse');
      $timeout.flush();
      expect(isoScope.badgeIcon).toEqual('fa-chevron-down');
    });

  });

});
