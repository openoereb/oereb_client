goog.provide('oereb.TopicController');

goog.require('oereb');
goog.require('oereb.ExtractService');

/**
 * Controller for concerned topics.
 * @param {angular.Scope} $scope The current scope.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname TopicController
 */
oereb.TopicController = function($scope, ExtractService, oerebEventExtractLoaded) {

  /** @export {string} */
  this.selectedTheme = undefined;

  $scope.$on(oerebEventExtractLoaded, function() {
    var concernedThemes = ExtractService.getConcernedThemes();
    if (concernedThemes.length > 0) {
      this.selectedTheme = concernedThemes[0]['Code'];
    }
  }.bind(this));

};

oereb.module.controller('TopicController', oereb.TopicController);
