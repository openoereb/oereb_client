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
 * @param {Object} realEstate The small representation of the real estate. It contains EGRID,
 *  municipality name and real estate number.
 * @returns {Array} The array of previously loaded egrids.
 */
oereb.StoreService.prototype.addRealEstate = function(realEstate) {
  var history = angular.fromJson(localStorage.history);
  if (history.indexOf(angular.toJson(realEstate)) === -1) {
    history.push(angular.toJson(realEstate));
    if (history.length > 5) {
      history.splice(0, 1);
    }
  }
  localStorage.history = angular.toJson(history);
  var historyJsonContent = angular.fromJson(localStorage.history);
  history = [];
  angular.forEach(historyJsonContent, function (item) {
    history.push(angular.fromJson(item));
  });
  return history;
};

/**
 * Get the stored history of before used EGRIDS.
 * @returns {Array} The array of previously loaded egrids.
 */
oereb.StoreService.prototype.getHistory = function() {
  var historyJsonContent = angular.fromJson(localStorage.history);
  var history = [];
  angular.forEach(historyJsonContent, function (item) {
    history.push(angular.fromJson(item));
  });
  return history;
};

oereb.module.service('StoreService', oereb.StoreService);
