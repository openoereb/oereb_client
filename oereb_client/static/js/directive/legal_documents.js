goog.provide('oereb.legalDocumentsDirective');

goog.require('oereb');
goog.require('oereb.multilingualTextFilter');

/**
 * Element containing the legal documents for a specified topic.
 *
 * @param {oereb.ExtractService} ExtractService The service for the extract handling.
 *
 * @returns {angular.Directive} Directive definition object.
 *
 * @ngInject
 */
oereb.legalDocumentsDirective = function(ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/legal_documents.html',
    scope: {

      /** @export */
      themeCode: '='

    },
    link: function(scope) {

      /** @export {Object|undefined} */
      scope.data = ExtractService.getDocuments(scope.themeCode);

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