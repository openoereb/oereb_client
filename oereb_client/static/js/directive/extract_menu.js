goog.provide('oereb.extractMenu');

goog.require('oereb');
goog.require('oereb.staticExtractDirective');

oereb.extractMenu = function ($location, geoViewConfig) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/extract_menu.html',
    scope: {

      /** @export */
      permaLink: '='
    },
    link: function(scope) {
      scope.permaLink = '';
      scope.goToGeoView = function () {
        var egrid = $location.search()['egrid'];
        var url = angular.fromJson(geoViewConfig).url;
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
      scope.providePermalink = function () {
        scope.permaLink = $location.absUrl();
        $('#modal-permalink').modal('toggle');
      }
    }
  }
};

/**
 * @ngdoc directive
 * @name extractMenu
 * @module oereb
 * @restrict E
 *
 * @description The menu which is shown in the extract to link to several related services.
 *
 */
oereb.module.directive('extractMenu', oereb.extractMenu);
