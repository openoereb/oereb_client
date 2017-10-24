goog.provide('oereb.TopicController');

goog.require('oereb');
goog.require('oereb.ExtractService');

/**
 * Controller for concerned topics.
 * @param {angular.Scope} $scope The current scope.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {oereb.MapService} MapService The service for map handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 * @param {string} oerebEventExtractClosed Name of the extract closed event.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname TopicController
 */
oereb.TopicController = function($scope, ExtractService, MapService, oerebEventExtractLoaded,
                                 oerebEventExtractClosed) {

  this.$scope_ = $scope;
  this.ExtractService_ = ExtractService;
  this.MapService_ = MapService;
  this.oerebEventExtractLoaded_ = oerebEventExtractLoaded;
  this.oerebEventExtractClosed_ = oerebEventExtractClosed;

  /**
   * @type {Array.<ol.layer.Image>}
   * @private
   */
  this.layers_ = [];

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

  // Clear layers on closed extract
  this.$scope_.$on(this.oerebEventExtractClosed_, function() {
    this.clearLayers();
  }.bind(this));

};

/**
 * Clears the current set of layers.
 * @export
 */
oereb.TopicController.prototype.clearLayers = function() {
  for (var i = this.layers_.length; i > 0; i--) {
    this.layers_[i - 1].setMap(null);
    this.layers_.splice(i - 1, 1);
  }
};

/**
 * Updates the layers the currently loaded extract.
 */
oereb.TopicController.prototype.updateLayers_ = function() {
  this.clearLayers();
  var projection = this.MapService_.getMap().getView().getProjection();
  var viewServices = this.ExtractService_.getViewServices();
  for (var i = 0; i < viewServices.length; i++) {
    var layer = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: viewServices[i]['url'],
        params: viewServices[i]['params'],
        projection: projection
      })
    });
    layer.set('topic', viewServices[i]['topic']);
    this.layers_.push(layer);
  }
};

/**
 * Show the layer for the specified theme code.
 * @param {string} topic The theme code to be selected.
 * @private
 */
oereb.TopicController.prototype.selectTheme_ = function(topic) {
  for (var i = 0; i < this.layers_.length; i++) {
    if (this.layers_[i].get('topic') === topic) {
      this.layers_[i].setMap(this.MapService_.getMap());
    }
    else {
      this.layers_[i].setMap(null);
    }
  }
};

oereb.module.controller('TopicController', oereb.TopicController);
