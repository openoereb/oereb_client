goog.provide('oereb.extractMenuDirective');

goog.require('oereb');
goog.require('oereb.staticExtractDirective');
goog.require('oereb.MapService');

/**
 * Drirective definition function.
 *
 * @param {angular.$location} $location Angular $location service.
 * @param {oereb.MapService} MapService Angular service for map handling.
 * @param {string} geoViewConfig JSON-encoded GeoView BL configuration.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.extractMenuDirective = function ($location, MapService, geoViewConfig) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/extract_menu.html',
    scope: {

      /** @export */
      permaLink: '='

    },
    link: function(scope, element) {

      // Initialize tooltip
      element.children('button').tooltip();

      /** @export {string} */
      scope.permaLink = '';

      /**
       * Switch to GeoView BL at the currently selected EGRID.
       * @export
       */
      scope.goToGeoView = function() {
        var egrid = $location.search()['egrid'];
        var config = angular.fromJson(geoViewConfig);
        var url = config['url'];
        var treeGroup = config['tree_group'];
        if (url.indexOf('?') === -1) {
          url += '?';
        }
        var layers = [];
        angular.forEach(MapService.getTopicLayers(), function(layer) {
          if (layer.getVisible()) {
            layers.push(layer.getSource().getParams()['LAYERS']);
          }
        });
        var parameters = [
          'wfs_layer=grundstueck',
          'wfs_egris_egrid=' + egrid,
          'tree_groups=' + treeGroup,
          'tree_group_layers_' + treeGroup + '=' + layers.join(','),
          'no_redirect='
        ];
        window.open(
          url + parameters.join('&'),
          '_blank'
        );
      };

      /**
       * Show the permalink in a modal window.
       * @export
       */
      scope.providePermalink = function() {
        scope.permaLink = $location.absUrl();
        angular.element('#modal-permalink').modal('toggle');
      };

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebExtractMenu
 * @module oereb
 * @restrict E
 *
 * @description The menu which is shown in the extract to link to several related services.
 *
 * @param {string} permaLink The permalink variable.
 */
oereb.module.directive('oerebExtractMenu', oereb.extractMenuDirective);
