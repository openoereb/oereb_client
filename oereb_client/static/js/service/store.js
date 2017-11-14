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
  if (!angular.isDefined(localStorage.history)) {
    localStorage.history = angular.toJson([]);
  }
};

/**
 * Add egrid to storage. The history will have 5 items in maximum. If it was already selected before, we do
 * not need to add it again.
 * @param {string} egrid The coordinate to query the EGRID for.
 * @returns {array} The array of previously loaded egrids.
 */
oereb.StoreService.prototype.addEgrid = function(egrid) {
  var history = angular.fromJson(localStorage.history);
  if (history.indexOf(egrid) === -1) {
    history.push(egrid);
    if (history.length > 5) {
      history.splice(0, 1);
    }
  }
  localStorage.history = angular.toJson(history);
  return history;
};

/**
 * Get the stored history of before used EGRIDS.
 * @returns {array} The array of previously loaded egrids.
 */
oereb.StoreService.prototype.getHistory = function() {
  var history = angular.fromJson(localStorage.history);
  return history;
};

oereb.module.service('StoreService', oereb.StoreService);
