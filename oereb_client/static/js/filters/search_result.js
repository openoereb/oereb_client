goog.provide('oereb.searchResultFilter');

goog.require('oereb');

oereb.searchResultFilter = function () {
  return function(searchResultString) {
      return searchResultString.replace(/ \((.*?)\)/, '');
  };
};

/**
 * @ngdoc filter
 * @name searchResult
 * @module oereb
 *
 * @description Extracts the information out of the search result string provided by searchAPI.
 *
 * @param {string} searchResultString The string which was provided as result by searchAPI.
 */
oereb.module.filter('searchResult', oereb.searchResultFilter);