goog.provide('oereb.extractMenuDirective');

goog.require('oereb');
goog.require('oereb.staticExtractDirective');

/**
 * Drirective definition function.
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
       * Switch to GeoView BL at the currently selected EGRID.
       * @export
       */
      scope.goToGeoView = function() {
        var egrid = $location.search()['egrid'];
        var url = angular.fromJson(geoViewConfig)['url'];
        if (url.indexOf('?') === -1) {
          url += '?';
        }
        var parameters = [
          "wfs_layer=grundstueck",
          'wfs_egris_egrid=' + egrid,
          "no_redirect="
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
