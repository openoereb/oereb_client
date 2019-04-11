goog.provide('oereb.sortLegendFilter');

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
oereb.sortLegendFilter = function() {

  var compare = function(a, b) {
    if (a['SubTheme'] < b['SubTheme'])
      return -1;
    if (a['SubTheme'] > b['SubTheme'])
      return 1;
    if ((a['AreaShare'] || 0) > (b['AreaShare'] || 0))
      return -1;
    if ((a['AreaShare'] || 0) < (b['AreaShare'] || 0))
      return 1;
    if ((a['LengthShare'] || 0) > (b['LengthShare'] || 0))
      return -1;
    if ((a['LengthShare'] || 0) < (b['LengthShare'] || 0))
      return 1;
    return 0;
  };

  return function(input) {
    if (angular.isArray(input)) {
      return input.sort(compare);
    }
    return input;
  };

};

/**
 * @ngdoc filter
 * @name sortLegend
 * @module oereb
 *
 * @description
 *
 * Sorts the legend elements respecting their sub theme, area and length.
 */
oereb.module.filter('sortLegend', oereb.sortLegendFilter);