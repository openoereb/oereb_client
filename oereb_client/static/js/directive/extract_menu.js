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
        var treeGroups = config['tree_groups'];
        if (url.indexOf('?') === -1) {
          url += '?';
        }
        var parameters = [
          'wfs_layer=grundstueck',
          'wfs_egris_egrid=' + egrid,
          'no_redirect='
        ];
        var layerNames = [];
        for (var i = 0; i < treeGroups.length; i++) {
          parameters.push(
            'tree_group_layers_' + treeGroups[i]['name'] + '=' + treeGroups[i]['layers'].join(',')
          );
          layerNames.push(treeGroups[i]['name']);
        }
        parameters.push('tree_groups=' + layerNames.join(','));
        window.open(
          encodeURI(url + parameters.join('&')),
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
