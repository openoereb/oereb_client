goog.require('oereb.TopicController');

describe('TopicController', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
    $provide.constant('oerebBaseLayerConfig', angular.toJson({
      type: 'wms',
      url: 'http://geowms.bl.ch',
      params: {
        LAYERS: 'grundkarte_sw_group'
      }
    }));
    $provide.constant('oerebAvailabilityConfig', angular.toJson({
      url: 'http://geowms.bl.ch',
      layer: 'oereb_availability'
    }));
  }));

  var $controller, $rootScope, $scope, ExtractService, MapService, oerebEventEgridSelected,
    oerebEventExtractClosed, oerebEventExtractLoaded;

  beforeEach(inject(function(_$controller_, _$rootScope_, _ExtractService_, _MapService_,
                             _oerebEventEgridSelected_, _oerebEventExtractLoaded_,
                             _oerebEventExtractClosed_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    MapService = _MapService_;
    oerebEventEgridSelected = _oerebEventEgridSelected_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
    oerebEventExtractClosed = _oerebEventExtractClosed_;
    $scope = $rootScope.$new();
  }));

  var getTopicController = function() {
    return $controller('TopicController', {
      $scope: $scope,
      ExtractService: ExtractService,
      MapService: MapService,
      oerebEventExtractLoaded: oerebEventExtractLoaded,
      oerebEventExtractClosed: oerebEventExtractClosed
    });
  };

  it('should be initialized correctly', function() {
    var controller = getTopicController();
    expect(controller.selectedTheme).toBeUndefined();
  });

  it('should watch the selected theme', function() {
    var controller = getTopicController();
    spyOn(controller, 'selectTheme_');
    expect(controller.selectedTheme).toBeUndefined();
    controller.selectedTheme = 'test';
    $scope.$digest();
    expect(controller.selectTheme_).toHaveBeenCalledWith('test');
  });

  describe('extract loaded event', function() {

    it('should not update the selected theme on empty list', function() {
      spyOn(ExtractService, 'getConcernedThemes').and.returnValue([]);
      var controller = getTopicController();
      $rootScope.$broadcast(oerebEventExtractLoaded);
      expect(controller.selectedTheme).toBeUndefined();
    });

    it('should update the selected theme', function() {
      var controller = getTopicController();
      spyOn(ExtractService, 'getConcernedThemes').and.returnValue([
        {
          Code: 'topic1'
        },
        {
          Code: 'topic2'
        }
      ]);
      spyOn(controller, 'updateLayers_');
      spyOn(controller, 'selectTheme_');
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$apply();
      expect(controller.selectedTheme).toEqual('topic1');
      expect(controller.updateLayers_).toHaveBeenCalled();
      expect(controller.selectTheme_).toHaveBeenCalledWith('topic1');
    });

  });

  describe('EGRID selected event', function() {

    it('should clear the layers', function() {
      getTopicController();
      spyOn(MapService, 'clearLayers');
      $rootScope.$broadcast(oerebEventEgridSelected);
      $rootScope.$apply();
      expect(MapService.clearLayers).toHaveBeenCalled();
    });

  });

  describe('extract closed event', function() {

    it('should clear the layers', function() {
      getTopicController();
      spyOn(MapService, 'clearLayers');
      $rootScope.$broadcast(oerebEventExtractClosed);
      $rootScope.$apply();
      expect(MapService.clearLayers).toHaveBeenCalled();
    });

  });

  describe('updateLayers_', function() {

    it('should update the list of layers', function() {
      var controller = getTopicController();
      spyOn(ExtractService, 'getViewServices').and.returnValue('View services');
      spyOn(controller, 'getRealEstateFeature_').and.returnValue('Real estate');
      spyOn(MapService, 'clearLayers');
      spyOn(MapService, 'addTopicLayers');
      spyOn(MapService, 'updateRealEstate');
      controller.updateLayers_();
      expect(MapService.clearLayers).toHaveBeenCalled();
      expect(MapService.addTopicLayers).toHaveBeenCalledWith('View services');
      expect(MapService.updateRealEstate).toHaveBeenCalledWith('Real estate');
    });

  });

  describe('selectTheme_', function() {

    it('should show the layer of the specified topic', function() {
      var layer1 = new ol.layer.Vector({
        source: new ol.source.Vector()
      });
      layer1.set('topic', 'topic1');
      var layer2 = new ol.layer.Vector({
        source: new ol.source.Vector()
      });
      layer2.set('topic', 'topic2');
      MapService.topicLayers_.push(layer1);
      MapService.topicLayers_.push(layer2);
      var controller = getTopicController();
      spyOn(layer1, 'setVisible');
      spyOn(layer2, 'setVisible');
      controller.selectTheme_('topic2');
      expect(layer1.setVisible).toHaveBeenCalledWith(false);
      expect(layer2.setVisible).toHaveBeenCalledWith(true);
    });

  });

  describe('getRealEstateFeature_', function() {

    it('should return undefined if no extract is available', function() {
      var controller = getTopicController();
      expect(controller.getRealEstateFeature_()).toBeUndefined();
    });

    it('should return undefined if real estate has no geometry', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({});
      var controller = getTopicController();
      expect(controller.getRealEstateFeature_()).toBeUndefined();
    });

    it('should return undefined if real estate geometry has no coordinates', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        'Limit': {}
      });
      var controller = getTopicController();
      expect(controller.getRealEstateFeature_()).toBeUndefined();
    });

    it('should return the real estate feature', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        'Limit': {
          'coordinates': [[[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]]
        }
      });
      var controller = getTopicController();
      var feature = controller.getRealEstateFeature_();
      expect(feature instanceof ol.Feature).toBe(true);
      expect(feature.getGeometry() instanceof ol.geom.MultiPolygon).toBe(true);
      expect(feature.getGeometry().getPolygons().length).toBe(1);
      expect(feature.getGeometry().getPolygon(0).getLinearRingCount()).toBe(1);
      expect(feature.getGeometry().getPolygon(0).getLinearRing(0).getCoordinates().length).toBe(5);
    });

  });

});