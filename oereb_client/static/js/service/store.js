goog.provide('oereb.StoreService');

goog.require('oereb');

/**
 * Angular service to handle the local browser storage.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngName StoreService
 *
 * @param {angular.Scope} $rootScope The application's root scope.
 * @param {string} oerebEventSymbolZoomEnabled Symbol zoom status event name.
 * @param {string} oerebLocalStoragePrefix Prefix for the localStorage properties.
 */
oereb.StoreService = function($rootScope, oerebEventSymbolZoomEnabled, oerebLocalStoragePrefix) {

  this.$rootScope_ = $rootScope;
  this.oerebEventSymbolZoomEnabled_ = oerebEventSymbolZoomEnabled;
  this.historyProperty_ = oerebLocalStoragePrefix + 'OerebHistory';
  this.availabilityProperty_ = oerebLocalStoragePrefix + 'OerebAvailability';
  this.symbolZoomProperty_ = oerebLocalStoragePrefix + 'OerebSymbolZoom';

  if (!angular.isDefined(localStorage[this.historyProperty_])) {
    localStorage[this.historyProperty_] = angular.toJson([]);
  }

  if (!angular.isDefined(localStorage[this.availabilityProperty_])) {
    localStorage[this.availabilityProperty_] = angular.toJson({
      'show': true
    });
  }

  if (!angular.isDefined(localStorage[this.symbolZoomProperty_])) {
    localStorage[this.symbolZoomProperty_] = angular.toJson({
      'show': true
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
  var history = angular.fromJson(localStorage[this.historyProperty_]);
  var index = history.indexOf(angular.toJson(realEstate));
  if (index > -1) {
    history.splice(index, 1);
  }
  else if (history.length > 4) {
    history.splice(0, 1);
  }
  history.push(angular.toJson(realEstate));
  localStorage[this.historyProperty_] = angular.toJson(history);
  var historyJsonContent = angular.fromJson(localStorage[this.historyProperty_]);
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
  var historyJsonContent = angular.fromJson(localStorage[this.historyProperty_]);
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
  var availability = angular.fromJson(localStorage[this.availabilityProperty_]);
  if (angular.isDefined(show)) {
    availability['show'] = show;
    localStorage[this.availabilityProperty_] = angular.toJson(availability);
  }
  return availability['show'];
};

/**
 * Enables/disables popovers for legend symbols and returns the current value.
 * @param {boolean|undefined} show True or false to enable/disable popovers.
 * @returns {boolean} True if popovers are enabled, false otherwise.
 */
oereb.StoreService.prototype.showSymbolZoom = function(show) {
  var symbolZoom = angular.fromJson(localStorage[this.symbolZoomProperty_]);
  if (angular.isDefined(show)) {
    symbolZoom['show'] = show;
    localStorage[this.symbolZoomProperty_] = angular.toJson(symbolZoom);
    this.$rootScope_.$broadcast(this.oerebEventSymbolZoomEnabled_, show);
  }
  return symbolZoom['show'];
};

oereb.module.service('StoreService', oereb.StoreService);
