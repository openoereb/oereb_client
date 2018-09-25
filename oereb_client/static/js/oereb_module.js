goog.provide('oereb');


/**
 * @ngdoc module
 * @name oereb
 *
 * @description
 *
 * The OeREB client application module.
 *
 * @type {!angular.Module}
 */
oereb.module = angular.module('oereb', [
  'ngAnimate',
  'ngFileSaver'
]);

/**
 * @function
 *
 * @description The module configuration.
 *
 * @param {angular.$locationProvider} $locationProvider The $location provider.
 *
 * @ngInject
 */
oereb.config = function($locationProvider) {

  // Enable HTML5 mode
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

};

oereb.module.config(oereb.config);


oereb.module.constant('oerebEventEgridSelected', 'oereb-event-egrid-selected');
oereb.module.constant('oerebEventExtractLoaded', 'oereb-event-extract-loaded');
oereb.module.constant('oerebEventExtractClosed', 'oereb-event-extract-closed');

oereb.module.constant('oerebEventSymbolZoomEnabled', 'oereb-event-symbol-zoom-enabled');
