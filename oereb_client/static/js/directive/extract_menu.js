goog.provide('oereb.extractMenuDirective');

goog.require('oereb');
goog.require('oereb.staticExtractDirective');
goog.require('oereb.formatFilter');
goog.require('oereb.ExtractService');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {angular.$filter} $filter Angular $filter service.
 * @param {angular.$location} $location Angular $location service.
 * @param {oereb.ExtractService} ExtractService Service for extract handling.
 * @param {string} oerebExternalViewerConfig JSON-encoded viewer linking configuration.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.extractMenuDirective = function ($filter, $location, ExtractService, oerebExternalViewerConfig) {
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
        var config = angular.fromJson(oerebExternalViewerConfig);
        return angular.isObject(config) && !angular.equals(config, {});
      };

      /**
       * @ngdoc method
       * @name oerebExtractMenu#goToExternalViewer
       *
       * @description
       *
       * Switch to GeoView BL at the currently selected EGRID.
       *
       * @export
       */
      scope.goToExternalViewer = function() {
        if (!angular.isDefined(ExtractService.getRealEstate())) {
          return;
        }
        var values = {
          'map_x': $location.search()['map_x'],
          'map_y': $location.search()['map_y'],
          'map_zoom': $location.search()['map_zoom'],
          'canton': ExtractService.getRealEstate()['Canton'],
          'egrid': ExtractService.getRealEstate()['EGRID'],
          'fosnr': ExtractService.getRealEstate()['FosNr'],
          'identdn': ExtractService.getRealEstate()['IdentDN'],
          'municipality': ExtractService.getRealEstate()['Municipality'],
          'number': ExtractService.getRealEstate()['Number']
        };
        var config = angular.fromJson(oerebExternalViewerConfig);
        if (!angular.equals(config, {})) {
          var url = config['url'];
          if (url.indexOf('?') === -1) {
            url += '?';
          }
          var params = config['params'];
          if (angular.isArray(params)) {
            url += params.join('&');
          }
          window.open(
            encodeURI($filter('format')(url, values)),
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
