goog.provide('oereb.legalDocumentsDirective');

goog.require('oereb');
goog.require('oereb.multilingualTextFilter');

/**
 * Element containing the legal documents for a specified topic.
 *
 * @param {angular.$filter} $filter The angular filter service.
 * @param {oereb.ExtractService} ExtractService The service for the extract handling.
 *
 * @returns {angular.Directive} Directive definition object.
 *
 * @ngInject
 */
oereb.legalDocumentsDirective = function($filter, ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/legal_documents.html',
    scope: {

      /** @export */
      themeCode: '='

    },
    link: function(scope) {

      var multilingualText = $filter('multilingualText');

      /** @export {Object|undefined} */
      scope.data = ExtractService.getDocuments(scope.themeCode);

      /**
       * Creates the complete document title, including abbreviation and number.
       * @param {Object} record The legal document record.
       * @returns {string} The complete document title (with abbreviation and number).
       * @export
       */
      scope.getTitle = function(record) {
        var title = multilingualText(record['Title']);
        if (angular.isArray(record['Abbrevation']) && record['Abbrevation'].length > 0) {
          title += ' (' + multilingualText(record['Abbrevation']) + ')';
        }
        if (angular.isString(record['OfficialNumber'])) {
          title += ', ' + record['OfficialNumber'];
        }
        return title;
      };

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebLegalDocuments
 * @module oereb
 * @restrict E
 *
 * @param {string} themeCode The code of the theme to show the legal documents for.
 */
oereb.module.directive('oerebLegalDocuments', oereb.legalDocumentsDirective);