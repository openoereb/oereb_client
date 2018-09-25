goog.provide('oereb.replaceFilter');

goog.require('oereb');

/**
 * @constructor
 *
 * @description
 *
 * Angular filter definition function.
 *
 * @returns {angular.Filter} Angular filter function.
 *
 * @ngInject
 */
oereb.replaceFilter = function() {

  return function(input, target, replacement) {
    if (angular.isString(input)) {
      return input.replace(new RegExp(target, 'g'), replacement);
    }
    return input;
  };

};

/**
 * @ngdoc filter
 * @name replace
 * @module oereb
 *
 * @description
 *
 * Replaces all occurrences of the specified substring with the defined replacement.
 *
 * @param {string} target The target substring.
 * @param {string} replacement The replacement.
 */
oereb.module.filter('replace', oereb.replaceFilter);