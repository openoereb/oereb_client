goog.provide('oereb.staticExtractDirective');

goog.require('oereb');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {angular.$http} $http Angular service for HTTP requests.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebApplicationUrl The application base URL.
 * @param {FileSaver} FileSaver The FileSaver service.
 * @param {Blob} Blob The Blob service.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.staticExtractDirective = function($http, ExtractService, oerebApplicationUrl, FileSaver, Blob) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/static_extract.html',
    scope: {},
    link: function(scope, element) {

      element.tooltip();

      var defaultIcon = 'fa-file-pdf-o';
      var loadingIcon = 'fa-spinner fa-pulse';

      /** @export {string} */
      scope.iconClass = defaultIcon;

      /**
       * @ngdoc method
       * @name oerebStaticExtract#request
       *
       * @description
       *
       * Requests the static extract.
       *
       * @export
       */
      scope.request = function() {
        scope.iconClass = loadingIcon;
        var egrid = ExtractService.getRealEstate()['EGRID'];
        var url = oerebApplicationUrl + 'extract/reduced/pdf/' + egrid;
        $http.get(url, {
          responseType: 'blob'
        }).then(
          function(response) {
            scope.iconClass = defaultIcon;
            scope.getFile_(response.data);
          },
          function() {
            scope.iconClass = defaultIcon;
            // TODO: Show error message
          }
        );
      };

      /**
       * @ngdoc method
       * @name oerebStaticExtract#getFile_
       *
       * @description
       *
       * Returns the received PDF as download.
       *
       * @param {string} content The PDF content
       *
       * @private
       */
      scope.getFile_ = function(content) {
        var data = new Blob([content], {'type': 'application/pdf'});
        var fileName = ExtractService.getExtract()['ExtractIdentifier'] + '.pdf';
        FileSaver.saveAs(data, fileName);
      };

    }
  };
};

/**
 * @ngdoc directive
 * @name oerebStaticExtract
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Button to request a PDF extract.
 */
oereb.module.directive('oerebStaticExtract', oereb.staticExtractDirective);