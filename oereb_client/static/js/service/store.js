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
  if (!angular.isDefined(localStorage.blOerebHistory)) {
    localStorage.blOerebHistory = angular.toJson([]);
  }
  if (!angular.isDefined(localStorage.blOerebAvailability)) {
    localStorage.blOerebAvailability = angular.toJson({
      'show': false
    });
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
  var history = angular.fromJson(localStorage.blOerebHistory);
  if (history.indexOf(angular.toJson(realEstate)) === -1) {
    history.push(angular.toJson(realEstate));
    if (history.length > 5) {
      history.splice(0, 1);
    }
  }
  localStorage.blOerebHistory = angular.toJson(history);
  var historyJsonContent = angular.fromJson(localStorage.blOerebHistory);
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
  var historyJsonContent = angular.fromJson(localStorage.blOerebHistory);
  var history = [];
  angular.forEach(historyJsonContent, function (item) {
    history.push(angular.fromJson(item));
  });
  return history;
};

/**
 * Updates the visibilty if defined and returns the current value.
 * @param {boolean|undefined} show True or false to update visibility.
 * @returns {boolean} The availability layer visibility.
 */
oereb.StoreService.prototype.showAvailability = function(show) {
  var availability = angular.fromJson(localStorage.blOerebAvailability);
  if (angular.isDefined(show)) {
    availability['show'] = show;
    localStorage.blOerebAvailability = angular.toJson(availability);
  }
  return availability['show'];
};

oereb.module.service('StoreService', oereb.StoreService);
