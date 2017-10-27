goog.require('oereb.TopicController');

describe('TopicController', function() {

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

  var $controller, $rootScope, $scope, ExtractService, MapService, oerebEventExtractClosed,
    oerebEventExtractLoaded;

  beforeEach(inject(function(_$controller_, _$rootScope_, _ExtractService_, _MapService_,
                             _oerebEventExtractLoaded_, _oerebEventExtractClosed_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    MapService = _MapService_;
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

  describe('extract closed event', function() {

    it('should clear the layers', function() {
      var controller = getTopicController();
      spyOn(controller, 'clearLayers');
      $rootScope.$broadcast(oerebEventExtractClosed);
      $rootScope.$apply();
      expect(controller.clearLayers).toHaveBeenCalled();
    });

  });

  describe('clearLayers', function() {

    it('should clear the list of layers', function() {
      var layers = [
        new ol.layer.Vector({
          source: new ol.source.Vector()
        }),
        new ol.layer.Vector({
          source: new ol.source.Vector()
        })
      ];
      spyOn(layers[0], 'setMap');
      spyOn(layers[1], 'setMap');
      spyOn(layers, 'splice');
      var controller = getTopicController();
      controller.layers_ = layers;
      controller.clearLayers();
      expect(layers[0].setMap).toHaveBeenCalledWith(null);
      expect(layers[1].setMap).toHaveBeenCalledWith(null);
      expect(layers.splice).toHaveBeenCalledTimes(2);
    });

  });

  describe('updateLayers_', function() {

    it('should update the list of layers', function() {
      var viewServices = [
        {
          topic: 'topic1',
          url: 'http://example.com/wms',
          params: {
            LAYERS: 'layer1'
          }
        },
        {
          topic: 'topic2',
          url: 'http://example.com/wms',
          params: {
            LAYERS: 'layer1'
          }
        }
      ];
      var controller = getTopicController();
      spyOn(ExtractService, 'getViewServices').and.returnValue(viewServices);
      spyOn(controller, 'clearLayers').and.callThrough();
      controller.updateLayers_();
      expect(controller.layers_.length).toBe(2);
      expect(controller.layers_[0].get('topic')).toEqual('topic1');
      expect(controller.layers_[1].get('topic')).toEqual('topic2');
      expect(controller.layers_[0].getSource().getProjection())
        .toBe(MapService.getMap().getView().getProjection());
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
      var controller = getTopicController();
      controller.layers_.push(layer1);
      controller.layers_.push(layer2);
      spyOn(layer1, 'setMap');
      spyOn(layer2, 'setMap');
      controller.selectTheme_('topic2');
      expect(layer1.setMap).toHaveBeenCalledWith(null);
      expect(layer2.setMap).toHaveBeenCalledWith(MapService.getMap());
    });

  });

});