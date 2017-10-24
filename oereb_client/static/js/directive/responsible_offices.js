goog.provide('oereb.responsibleOfficesDirective');

goog.require('oereb');
goog.require('oereb.multilingualTextFilter');

/**
 * @function
 *
 * @description Directive definition function
 *
 * @param {oereb.ExtractService} ExtractService Service for extract handling.
 *
 * @returns {angular.Directive} Directive definition object.
 *
 * @ngInject
 */
oereb.responsibleOfficesDirective = function(ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/responsible_offices.html',
    scope: {
      /** @export */ themeCode: '='
    },
    link: function(scope) {

      /** @export {Array|undefined} */
      scope.data = ExtractService.getResponsibleOffices(scope.themeCode);

    }
  };
};

/**
 * @ngdoc directive
 * @name oerebResponsibleOffice
 * @module oereb
 * @restrict E
 *
 * @description The responsible office for a specific topic.
 *
 * @param {Array} themeCode The code of the current topic.
 */
oereb.module.directive('oerebResponsibleOffices', oereb.responsibleOfficesDirective);