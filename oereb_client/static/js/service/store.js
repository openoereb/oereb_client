goog.provide('oereb.StoreService');

goog.require('oereb');

/**
 * Angular service to handle the local browser storage.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngName StoreService
 */
oereb.StoreService = function() {
  localStorage.history = angular.toJson([]);
};

/**
 * Add egrid to storage.
 * @param {string} egrid The coordinate to query the EGRID for.
 * @returns {angular.$q.Promise} Promise for the EGRID request.
 */
oereb.StoreService.prototype.addEgrid = function(egrid) {
  var history = angular.fromJson(localStorage.history);
  history.push(egrid);
  if (history.length > 5) {
    history.splice(0, 1);
  }
};

oereb.module.service('StoreService', oereb.StoreService);
