goog.provide('oereb.extractMenu');

goog.require('oereb');

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
        var url = angular.fromJson(geoViewConfig).url;
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
