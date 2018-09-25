goog.provide('oereb.searchInformationFilter');

goog.require('oereb');

/**
 * @constructor
 *
 * @description
 *
 * Angular filter definition function.
 *
 * @param {angular.$filter} $filter The angular $filter service.
 *
 * @returns {angular.Filter} Angular filter function.
 *
 * @ngInject
 */
oereb.searchInformationFilter = function($filter) {

  var multilingualText = $filter('multilingualText');

  return function(input, search, language) {
    if (angular.isArray(input) && angular.isString(search) && search.length > 0) {
      var lower = search.toLowerCase();
      var filtered = [];
      for (var i = 0; i < input.length; i++) {
        var item = input[i];
        if (
          multilingualText(item['Title'], language).toLowerCase().indexOf(lower) > -1 ||
          multilingualText(item['Content'], language).toLowerCase().indexOf(lower) > -1
        ) {
          filtered.push(item);
        }
      }
      return filtered;
    }
    return input;
  };

};

/**
 * @ngdoc filter
 * @name searchInformation
 * @module oereb
 *
 * @description
 *
 * Search for the specified input in glossary or exclusion of liability records.
 *
 * @param {string} language The language for sorting.
 */
oereb.module.filter('searchInformation', oereb.searchInformationFilter);