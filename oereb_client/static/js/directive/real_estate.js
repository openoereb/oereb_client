goog.provide('oereb.realEstateDirective');

goog.require('oereb');
goog.require('oereb.ExtractService');
goog.require('oereb.replaceFilter');

/**
 * Angular directive for rendering the real estate data.
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 * @returns {angular.Directive} Angular directive definition object.
 * @ngInject
 * @ngdoc directive
 * @ngname oerebRealEstate
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

oereb.module.directive('oerebRealEstate', oereb.realEstateDirective);
