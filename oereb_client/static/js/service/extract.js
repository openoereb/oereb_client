goog.provide('oereb.ExtractService');

goog.require('oereb');

/**
 * Angular service to request a specific extract.
 * @param {angular.$http} $http Angular service for HTTP requests.
 * @param {angular.$q} $q Angular service for deferrable objects.
 * @param {angular.Module.constant} oerebApplicationUrl Angular service for HTTP requests.
 * @constructor
 * @ngInject
 * @ngdoc service
 * @ngname ExtractService
 */
oereb.ExtractService = function($http, $q, oerebApplicationUrl) {

  this.$http_ = $http;
  this.$q_ = $q;
  this.applicationUrl_ = oerebApplicationUrl;

  this.extract_ = undefined;
  this.embeddable_ = undefined;

};

/**
 * Requests the extract for the specified EGRID.
 * @param {string} egrid The EGRID to request the extract for.
 * @returns {angular.$q.Promise} Promise for the EGRID request.
 */
oereb.ExtractService.prototype.queryExtractById = function(egrid) {
  this.extract_ = undefined;
  this.embeddable_ = undefined;
  var def = this.$q_.defer();
  this.$http_.get(this.applicationUrl_ + '/extract/reduced/json/geometry/' + egrid).then(
    function(response) {
      if (angular.isObject(response.data['GetExtractByIdResponse'])) {
        this.extract_ = response.data['GetExtractByIdResponse']['extract'];
        if (angular.isObject(response.data['GetExtractByIdResponse']['embeddable'])) {
          this.embeddable_ = response.data['GetExtractByIdResponse']['embeddable'];
        }
        def.resolve(response.data['GetExtractByIdResponse']);
      }
      else {
        def.reject('Invalid response format.');
      }
    }.bind(this),
    function(response) {
      var error = 'Requesting extract for ' + egrid + ' failed.';
      if (angular.isString(response.data)) {
        error += ' ' + response.data;
      }
      def.reject(error);
    }
  );
  return def.promise;
};

/**
 * Returns the extract if available.
 * @returns {Object|undefined} The extract object or undefined.
 */
oereb.ExtractService.prototype.getExtract = function() {
  return this.extract_;
};

/**
 * Returns the real estate data if available.
 * @returns {Object|undefined} The real estate data or undefined.
 */
oereb.ExtractService.prototype.getRealEstate = function() {
  if (angular.isDefined(this.getExtract())) {
    return this.getExtract()['RealEstate'];
  }
  return undefined;
};

/**
 * Returns list of concerned themes.
 * @returns {Array|undefined} The list of concerned themes.
 */
oereb.ExtractService.prototype.getConcernedThemes = function() {
  if (angular.isDefined(this.getExtract())) {
    return this.getExtract()['ConcernedTheme'];
  }
  return undefined;
};

/**
 * Returns list of not concerned themes.
 * @returns {Array|undefined} The list of not concerned themes.
 */
oereb.ExtractService.prototype.getNotConcernedThemes = function() {
  if (angular.isDefined(this.getExtract())) {
    return this.getExtract()['NotConcernedTheme'];
  }
  return undefined;
};

/**
 * Returns list of themes without data.
 * @returns {Array|undefined} The list of themes without data.
 */
oereb.ExtractService.prototype.getThemesWithoutData = function() {
  if (angular.isDefined(this.getExtract())) {
    return this.getExtract()['ThemeWithoutData'];
  }
  return undefined;
};

/**
 * Returns the public law restrictions of the specified topic.
 * @param {string} themeCode The code of the topic to return the restrictions for.
 * @returns {Array|undefined} The public law restrictions of the specified topic.
 */
oereb.ExtractService.prototype.getRestrictions = function(themeCode) {
  if (angular.isDefined(this.getRealEstate())) {
    var restrictions = [];
    angular.forEach(this.getRealEstate()['RestrictionOnLandownership'], function(restriction) {
      if (restriction['Theme']['Code'] === themeCode) {
        restrictions.push(restriction);
      }
    });
    return restrictions;
  }
  return undefined;
};

/**
 * Returns the legend entries of the specified topic.
 * @param {string} themeCode The code of the topic to return the restrictions for.
 * @returns {Array|undefined} The legend entries of the specified topic.
 */
oereb.ExtractService.prototype.getLegend = function(themeCode) {
  var restrictions = this.getRestrictions(themeCode);
  if (angular.isDefined(restrictions)) {
    var legendEntries = [];
    for (var i = 0; i < restrictions.length; i++) {
      var existing = false;
      for (var j = 0; j < legendEntries.length; j++) {
        if (legendEntries[j]['TypeCode'] === restrictions[i]['TypeCode']) {
          existing = true;
          legendEntries[j]['Area'] += restrictions[i]['Area'];
          legendEntries[j]['PartInPercent'] += restrictions[i]['PartInPercent'];
          break;

        }

      }
      if (!existing) {
        legendEntries.push({
          'TypeCode': restrictions[i]['TypeCode'],
          'Information': restrictions[i]['Information'],
          'Area': restrictions[i]['Area'],
          'PartInPercent': restrictions[i]['PartInPercent'],
          'SymbolRef': restrictions[i]['SymbolRef']
        });
      }
    }
    return legendEntries;
  }
  return undefined;
};

/**
 * Returns the embeddable if available.
 * @returns {Object|undefined} The extract object or undefined.
 */
oereb.ExtractService.prototype.getEmbeddable = function() {
  return this.embeddable_;
};

oereb.module.service('ExtractService', oereb.ExtractService);
