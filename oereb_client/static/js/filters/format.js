goog.provide('oereb.formatFilter');

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
oereb.formatFilter = function() {

  var regex = new RegExp('({([\\w]*)})', 'g');

  return function(input, values) {
    if (angular.isString(input)) {
      var result = input;
      var match;
      while ((match = regex.exec(input)) !== null) {
        result = result.replace(match[1], values[match[2]] || '');
      }
      return result;
    }
    return input;
  };

};

/**
 * @ngdoc filter
 * @name format
 * @module oereb
 *
 * @description
 *
 * Searches for "{<key>}" marks in the input text and replaces them with the provided values.
 *
 * @param {Object} values The key-value pairs to be inserted.
 */
oereb.module.filter('format', oereb.formatFilter);