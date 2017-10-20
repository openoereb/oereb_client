goog.provide('oereb.multilingualTextFilter');

goog.require('oereb');

/**
 * @constructor
 *
 * Extracts the specified language or default language from a multilingual array.
 *
 * @param {string} oerebDefaultLanguage The default language for the application.
 *
 * @returns {angular.Filter} Angular filter function.
 *
 * @ngInject
 */
oereb.multilingualTextFilter = function(oerebDefaultLanguage) {
  return function(input, language) {
    if (angular.isArray(input) && input.length > 0) {
      var result;
      if (angular.isString(language)) {
        for (var i = 0; i < input.length; i++) {
          if (input[i]['Language'] === language) {
            result = input[i]['Text'];
            break;
          }
        }
      }
      if (!angular.isDefined(result)) {
        for (var j = 0; j < input.length; j++) {
          if (input[j]['Language'] === oerebDefaultLanguage) {
            result = input[j]['Text'];
            break;
          }
        }
      }
      if (!angular.isDefined(result)) {
        result = input[0]['Text'];
      }
      return result;
    }
    return input;
  };
};

/**
 * @ngdoc filter
 * @name multilingualText
 * @module oereb
 *
 * @description Extracts the specified language from a multilingual array.
 *
 * - If no language is specified, the default language will be used.
 * - If no language matches, the first element will be returned
 *
 * @param {string} language The language to extract.
 */
oereb.module.filter('multilingualText', oereb.multilingualTextFilter);