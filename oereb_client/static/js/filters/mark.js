goog.provide('oereb.markFilter');

goog.require('oereb');

/**
 * @constructor
 *
 * @description
 *
 * Angular filter definition function.
 *
 * @param {angular.$sce} $sce Angular $sce service.
 *
 * @returns {angular.Filter} Angular filter function.
 *
 * @ngInject
 */
oereb.markFilter = function($sce) {

  return function(input, target) {
    if (
      angular.isString(input) &&
      input.length > 0 &&
      angular.isString(target) &&
      target.length > 0
    ) {
      return $sce.trustAsHtml(input.replace(new RegExp(target, 'gi'), '<mark>$&</mark>'));
    }
    return $sce.trustAsHtml(input);
  };

};

/**
 * @ngdoc filter
 * @name mark
 * @module oereb
 *
 * @description
 *
 * Marks all occurrences of the specified substring.
 *
 * @param {string} target The target substring.
 */
oereb.module.filter('mark', oereb.markFilter);