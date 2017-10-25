goog.provide('oereb.staticExtractDirective');

goog.require('oereb');

/**
 * Directive definition function.
 *
 * @param {angular.$http} $http Angular service for HTTP requests.
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebApplicationUrl The application base URL.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.staticExtractDirective = function($http, ExtractService, oerebApplicationUrl) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/static_extract.html',
    scope: {},
    link: function(scope) {

      var defaultIcon = 'fa-file-pdf-o';
      var loadingIcon = 'fa-spinner fa-pulse';

      /** @export {string} */
      scope.iconClass = defaultIcon;

      /** @export {Array} */
      scope.flavours = [
        {
          'value': 'reduced',
          'label': 'reduziert'
        },
        {
          'value': 'full',
          'label': 'vollständig'
        }
      ];

      /**
       * Requests the static extract.
       * @param {string} flavour The flavour of the requested PDF extract.
       * @export
       */
      scope.request = function(flavour) {
        scope.iconClass = loadingIcon;
        var egrid = ExtractService.getRealEstate()['EGRID'];
        var url = oerebApplicationUrl + '/extract/' + flavour + '/pdf/' + egrid;
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
       * Returns the received PDF as download.
       * @param {string} content The PDF content
       * @private
       */
      scope.getFile_ = function(content) {
        var pdfLink = document.createElement('a');
        var mimeType = 'application/pdf';
        var fileName = ExtractService.getExtract()['ExtractIdentifier'] + '.pdf';
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(new Blob([content], {
            type: mimeType
          }), fileName);
        }
        else if (URL && 'download' in pdfLink) {
          pdfLink.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
          }));
          pdfLink.setAttribute('download', fileName);
          pdfLink.style.visibility = 'hidden';
          document.body.appendChild(pdfLink);
          pdfLink.click();
          document.body.removeChild(pdfLink);
        }
        else {
          location.href = 'data:application/octet-stream,' + encodeURIComponent(content);
        }
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
 * @description Selector to request a reduced/full PDF extract.
 */
oereb.module.directive('oerebStaticExtract', oereb.staticExtractDirective);