goog.provide('oereb.generalInformationDirective');

goog.require('oereb');

/**
 * Directive definition function
 *
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.generalInformationDirective = function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/general_information.html',
    scope: {},
    link: function(scope) {

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