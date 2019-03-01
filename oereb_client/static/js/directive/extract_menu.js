goog.provide('oereb.extractMenuDirective');

goog.require('oereb');
goog.require('oereb.staticExtractDirective');
goog.require('oereb.formatFilter');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {angular.$location} $location Angular $location service.
 * @param {string} geoViewConfig JSON-encoded GeoView BL configuration.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.extractMenuDirective = function ($location, geoViewConfig) {
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
       * @ngdoc method
       * @name oerebExtractMenu#hasLinkConfig
       *
       * @description
       *
       * Returns true, if a valid config has been passed.
       *
       * @returns {boolean} True, if a valid config has been passed, false otherwise.
       *
       * @export
       */
      scope.hasLinkConfig = function() {
        var config = angular.fromJson(geoViewConfig);
        return angular.isObject(config) && !angular.equals(config, {});
      };

      /**
       * @ngdoc method
       * @name oerebExtractMenu#goToGeoView
       *
       * @description
       *
       * Switch to GeoView BL at the currently selected EGRID.
       *
       * @export
       */
      scope.goToGeoView = function() {
        var egrid = $location.search()['egrid'];
        var config = angular.fromJson(geoViewConfig);
        if (!angular.equals(config, {})) {
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
        }
      };

      /**
       * @ngdoc method
       * @name oerebExtractMenu#providePermalink
       *
       * @description
       *
       * Show the permalink in a modal window.
       *
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
 * @description
 *
 * The menu which is shown in the extract to link to several related services.
 *
 * @param {string} permaLink The permalink variable.
 */
oereb.module.directive('oerebExtractMenu', oereb.extractMenuDirective);
