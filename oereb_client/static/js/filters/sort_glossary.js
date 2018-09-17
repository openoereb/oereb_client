goog.provide('oereb.sortGlossaryFilter');

goog.require('oereb');

/**
 * @constructor
 *
 * Angular filter definition function.
 *
 * @param {angular.$filter} $filter The angular $filter service.
 *
 * @returns {angular.Filter} Angular filter function.
 *
 * @ngInject
 */
oereb.sortGlossaryFilter = function($filter) {

  var lang;

  var multilingualText = $filter('multilingualText');

  var compare = function(a, b) {
    var titleA = multilingualText(a['Title'], lang);
    var titleB = multilingualText(b['Title'], lang);
    if (angular.isString(titleA) && angular.isString(titleB))
      return titleA.localeCompare(titleB);
    if (titleA < titleB)
      return -1;
    if (titleA > titleB)
      return 1;
    return 0;
  };

  return function(input, language) {
    if (angular.isArray(input)) {
      lang = language;
      return input.sort(compare);
    }
    return input;
  };

};

/**
 * @ngdoc filter
 * @name orderGlossary
 * @module oereb
 *
 * @description Sorts the glossary elements respecting the specified language.
 *
 * @param {string} language The language for sorting.
 */
oereb.module.filter('sortGlossary', oereb.sortGlossaryFilter);