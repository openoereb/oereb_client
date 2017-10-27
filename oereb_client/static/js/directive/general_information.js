goog.provide('oereb.generalInformationDirective');

goog.require('oereb');

/**
 * Directive definition function
 *
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.generalInformationDirective = function(ExtractService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/general_information.html',
    scope: {},
    link: function(scope) {

      /** @export {Object} */
      scope.office = ExtractService.getExtract()['PLRCadastreAuthority'];

      /** @export {string} */
      scope.logoCan = ExtractService.getExtract()['CantonalLogoRef'];

      /** @export {string} */
      scope.logoFed = ExtractService.getExtract()['FederalLogoRef'];

      /** @export {string} */
      scope.logoMun = ExtractService.getExtract()['MunicipalityLogoRef'];

      /** @export {Array} */
      scope.baseData = ExtractService.getExtract()['BaseData'];

      /** @export {Array} */
      scope.generalInformation = ExtractService.getExtract()['GeneralInformation'];

    }
  };
};

/**
 * @ngdoc directive
 * @name oerebGeneralInformation
 * @module oereb
 * @restrict E
 *
 * @description Element to display the general information for the current extract.
 */
oereb.module.directive('oerebGeneralInformation', oereb.generalInformationDirective);