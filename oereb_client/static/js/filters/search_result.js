goog.provide('oereb.searchResultFilter');

goog.require('oereb');

oereb.searchResultFilter = function () {
  return function(x) {
      return x.replace(/ \((.*?)\)/, '');
  };
};

oereb.module.filter('searchResult', oereb.searchResultFilter);