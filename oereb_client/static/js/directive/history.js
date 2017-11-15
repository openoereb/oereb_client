goog.provide('oereb.historyDirective');

goog.require('oereb');
goog.require('oereb.StoreService');

/**
 * Directive definition function.
 *
 * @param {oereb.StoreService} StoreService The service for the handling of local storage.
 * @param {oereb.ExtractService} ExtractService Angular service for extract loading.
 * @param {string} oerebEventExtractLoaded Event name for loaded extract.
 * @param {string} oerebEventEgridSelected Event name for event when egrid was selected.
 * @returns {angular.Directive} Angular directive definition.
 *
 * @ngInject
 */
oereb.historyDirective = function(StoreService, ExtractService, oerebEventExtractLoaded,
                                  oerebEventEgridSelected) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'static/html/history.html',
    scope: {},
    link: function(scope) {
      scope.history = StoreService.getHistory();
      scope.$on(oerebEventExtractLoaded, function() {
        var realEstate = {
          egrid: ExtractService.getRealEstate()['EGRID'],
          number: ExtractService.getRealEstate()['Number'],
          municipality: ExtractService.getRealEstate()['Municipality']
        };
        scope.history = StoreService.addRealEstate(realEstate);
      });
      scope.select = function (realEstate) {
        scope.$emit(oerebEventEgridSelected, realEstate.egrid, true);
      }
    }
  }
};

/**
 * @ngdoc directive
 * @name historyDirective
 * @module oereb
 *
 * @description Directive showing last five loaded EGRIDS.
 */
oereb.module.directive('oerebHistory', oereb.historyDirective);