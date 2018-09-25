goog.provide('oereb.searchResultFilter');

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
oereb.searchResultFilter = function () {
  return function(searchResultString) {
      return searchResultString.replace(/ \((.*?)\)/g, '');
  };
};

/**
 * @ngdoc filter
 * @name searchResult
 * @module oereb
 *
 * @description
 *
 * Extracts the information out of the search result string provided by search API.
 *
 * @param {string} searchResultString The string which was provided as result by search API.
 */
oereb.module.filter('searchResult', oereb.searchResultFilter);