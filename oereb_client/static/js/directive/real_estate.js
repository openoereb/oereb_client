goog.provide('oereb.realEstateDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.replaceFilter');

/**
 * @function
 *
 * @description
 *
 * Directive definition function.
 *
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 *
 * @returns {angular.Directive} Angular directive definition object.
 *
 * @ngInject
 */
oereb.realEstateDirective = function(ExtractService, oerebEventExtractLoaded) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/real_estate.html',
    scope: {},
    link: function(scope) {

      /** @export {Object} */
      scope.data = {};

      // Update real estate data on loaded extract
      scope.$on(oerebEventExtractLoaded, function() {
        scope.data = ExtractService.getRealEstate();
      });

    }
  }
};

/**
 * @ngdoc directive
 * @name oerebRealEstate
 * @module oereb
 * @restrict E
 *
 * @description
 *
 * Angular directive for rendering the real estate data.
 */
oereb.module.directive('oerebRealEstate', oereb.realEstateDirective);
