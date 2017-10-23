/**
 * @module oereb
 */

goog.provide('oereb');


/** @type {!angular.Module} */
oereb.module = angular.module('oereb', [
  'ngAnimate'
]);

oereb.module.constant('oerebEventEgridSelected', 'oereb-event-egrid-selected');
oereb.module.constant('oerebEventExtractLoaded', 'oereb-event-extract-loaded');
oereb.module.constant('oerebEventExtractClosed', 'oereb-event-extract-closed');
