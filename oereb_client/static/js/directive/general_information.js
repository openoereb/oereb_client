goog.provide('oereb.generalInformationDirective');

goog.require('oereb');

/**
 * @function
 *
 * @description
 *
 * Directive definition function
 *
 * @param {oereb.ExtractService} ExtractService The service for extract handling.
 * @param {string} oerebEventExtractLoaded Name of the extract loaded event.
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.generalInformationDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/general_information.html',
    scope: {},
    link: function(scope) {

      /** @export {Object|undefined} */
      scope.office = undefined;

      /** @export {string|undefined} */
      scope.logoCan = undefined;

      /** @export {string|undefined} */
      scope.logoFed = undefined;

      /** @export {string|undefined} */
      scope.logoMun = undefined;

      /** @export {string|undefined} */
      scope.municipality = undefined;

      /** @export {Array} */
      scope.baseData = [];

      /** @export {Array} */
      scope.generalInformation = [];

      /**
       * Updates the displayed data.
       */
      var update = function() {
        if (angular.isDefined(ExtractService.getExtract())) {
          scope.office = ExtractService.getExtract()['PLRCadastreAuthority'];
          scope.logoCan = ExtractService.getExtract()['CantonalLogoRef'];
          scope.logoFed = ExtractService.getExtract()['FederalLogoRef'];
          scope.logoMun = ExtractService.getExtract()['MunicipalityLogoRef'];
          scope.baseData = ExtractService.getExtract()['BaseData'];
          scope.generalInformation = ExtractService.getExtract()['GeneralInformation'];
          scope.municipality = ExtractService.getRealEstate()['Municipality'];
        }
        else {
          scope.office = undefined;
          scope.logoCan = undefined;
          scope.logoFed = undefined;
          scope.logoMun = undefined;
          scope.municipality = undefined;
          scope.baseData = [];
          scope.generalInformation = [];
        }
      };

      // Initialize data
      update();

      // Update data on extract loaded event
      scope.$on(oerebEventExtractLoaded, function() {
        update();
      });

    }
  };
};

/**
 * @ngdoc directive
 * @name oerebGeneralInformation
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Element to display the general information for the current extract.
 */
oereb.module.directive('oerebGeneralInformation', oereb.generalInformationDirective);