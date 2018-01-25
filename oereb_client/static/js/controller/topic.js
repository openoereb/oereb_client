goog.provide('oereb.TopicController');

goog.require('oereb');
goog.require('oereb.ExtractService');

/**
 * Controller for concerned topics.
 * @param {angular.Scope} $scope The current scope.
 * @param {angular.Scope} $rootScope The application root scope.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {oereb.MapService} MapService The service for map handling.
 * @param {string} oerebEventEgridSelected Event name for selected EGRID.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 * @param {string} oerebEventExtractClosed Name of the extract closed event.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname TopicController
 */
oereb.TopicController = function($scope, $rootScope, ExtractService, MapService, oerebEventEgridSelected,
                                 oerebEventExtractLoaded, oerebEventExtractClosed) {

  this.$scope_ = $scope;
  this.$rootScope_ = $rootScope;
  this.ExtractService_ = ExtractService;
  this.MapService_ = MapService;
  this.oerebEventEgridSelected_ = oerebEventEgridSelected;
  this.oerebEventExtractLoaded_ = oerebEventExtractLoaded;
  this.oerebEventExtractClosed_ = oerebEventExtractClosed;

  /** @export {string} */
  this.selectedTheme = undefined;

  // Switch layer on changed topic selection
  this.$scope_.$watch(angular.bind(this, function() {
    return this.selectedTheme;
  }.bind(this)), function (topic) {
    this.selectTheme_(topic);
  }.bind(this));

  // Update layers and intially selected topic on loaded extract
  this.$scope_.$on(this.oerebEventExtractLoaded_, function() {
    this.updateLayers_();
    var concernedThemes = this.ExtractService_.getConcernedThemes();
    if (concernedThemes.length > 0) {
      this.selectedTheme = concernedThemes[0]['Code'];
      this.selectTheme_(this.selectedTheme);
    }
  }.bind(this));

  // Clear layers on selected EGRID
  this.$rootScope_.$on(this.oerebEventEgridSelected_, function() {
    this.MapService_.clearLayers();
  }.bind(this));

  // Clear layers on closed extract
  this.$scope_.$on(this.oerebEventExtractClosed_, function() {
    this.MapService_.clearLayers();
  }.bind(this));

};

/**
 * Creates an Openlayers feature for the current real estate data.
 * @returns {ol.Feature} The real estate feature.
 * @private
 */
oereb.TopicController.prototype.getRealEstateFeature_ = function() {
  var realEstate = this.ExtractService_.getRealEstate();
  if (
    angular.isDefined(realEstate) &&
    angular.isDefined(realEstate['Limit']) &&
    angular.isDefined(realEstate['Limit']['coordinates'])
  ) {
    var geom = new ol.geom.MultiPolygon(realEstate['Limit']['coordinates']);
    return new ol.Feature(geom);
  }
};

/**
 * Updates the layers the currently loaded extract.
 */
oereb.TopicController.prototype.updateLayers_ = function() {
  this.MapService_.clearLayers();
  this.MapService_.addTopicLayers(this.ExtractService_.getViewServices());
  this.MapService_.updateRealEstate(this.getRealEstateFeature_());
};

/**
 * Show the layer for the specified theme code.
 * @param {string} topic The theme code to be selected.
 * @private
 */
oereb.TopicController.prototype.selectTheme_ = function(topic) {
  this.MapService_.getRealEstateLayer().setMap(null);
  var layers = this.MapService_.getTopicLayers();
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].get('topic') === topic) {
      layers[i].setVisible(true);
    }
    else {
      layers[i].setVisible(false);
    }
  }
  this.MapService_.getRealEstateLayer().setMap(this.MapService_.getMap());
};

oereb.module.controller('TopicController', oereb.TopicController);
