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
  this.$http_.get(this.applicationUrl_ + 'extract/reduced/json/geometry/' + egrid).then(
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
 * @returns {Object|undefined} The legend entries of the specified topic.
 */
oereb.ExtractService.prototype.getLegend = function(themeCode) {
  var restrictions = this.getRestrictions(themeCode);
  if (angular.isDefined(restrictions)) {
    var legendEntries = [];
    var legendGraphics = [];
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
      this.addIfNotContains_(restrictions[i]['Map']['LegendAtWeb'], legendGraphics);
    }
    return {
      'entries': legendEntries,
      'graphics': legendGraphics
    };
  }
  return undefined;
};

/**
 * Adds the item to the specified target array if it's not already contained. `angular.equals` is used for the
 * comparison.
 * @param {Object|Array|string|number} item The element to be added.
 * @param {Array} target The target array to add the element to.
 * @private
 */
oereb.ExtractService.prototype.addIfNotContains_ = function(item, target) {
  if (angular.isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      if (angular.equals(target[i], item)) {
        return;
      }
    }
    target.push(item);
  }
};

/**
 * Adds the document to the specified target array if it's not already contained. `angular.equals` is used for
 * the comparison.
 * @param {Object} document The document to be added.
 * @param {Array} target The target array to add the element to.
 * @private
 */
oereb.ExtractService.prototype.addDocumentIfNotContained_ = function(document, target) {
  for (var i = 0; i < target.length; i++) {
    // Check if document already exists (only use 'Title', 'OfficialNumber' and 'TextAtWeb' for comparison)
    if (
      angular.equals(target[i]['Title'], document['Title']) &&
      angular.equals(target[i]['OfficialNumber'], document['OfficialNumber']) &&
      angular.equals(target[i]['TextAtWeb'], document['TextAtWeb'])
    ) {
      // Add missing article numbers if document already exists
      for (var j = 0; j < document['ArticleNumber'].length; j++) {
        this.addIfNotContains_(document['ArticleNumber'][j], target[i]['ArticleNumber']);
      }
      // Add missing articles if document already exists
      for (var k = 0; k < document['Article'].length; k++) {
        this.addIfNotContains_(document['Article'][k], target[i]['Article']);
      }
      return;
    }
  }
  // Add document if it is missing
  target.push(document);
};

/**
 * Add each listed document to the target array if it's not already contained.
 * @param {Array} documents The documents to be added.
 * @param {Array} target The target array.
 * @private
 */
oereb.ExtractService.prototype.addDocumentsIfNotContained_ = function(documents, target) {
  // Iterate documents to be added
  for (var i = 0; i < documents.length; i++) {
    // Create document object with necessary properties and check if it needs to be added
    this.addDocumentIfNotContained_({
      'Title': documents[i]['Title'],
      'OfficialNumber': documents[i]['OfficialNumber'],
      'ArticleNumber': documents[i]['ArticleNumber'] || [],
      'Article': documents[i]['Article'] || [],
      'TextAtWeb': documents[i]['TextAtWeb']
    }, target);
    // Do the same for possible references
    var references = documents[i]['Reference'];
    if (angular.isArray(references)) {
      this.addDocumentsIfNotContained_(references, target);
    }
  }
};

/**
 * Returns the legal documents of the specified topic.
 * @param {string} themeCode The code of the topic to return the restrictions for.
 * @returns {Object|undefined} The legal documents of the specified topic.
 */
oereb.ExtractService.prototype.getDocuments = function(themeCode) {
  // Get the restrictions for the specified topic
  var restrictions = this.getRestrictions(themeCode);
  if (angular.isArray(restrictions)) {
    var legalProvisions = [];
    var documents = [];
    // Iterate the resulting restrictions
    for (var i = 0; i < restrictions.length; i++) {
      // Iterate the legal provisions for each restriction
      var legalProvision = restrictions[i]['LegalProvisions'];
      for (var j = 0; j < legalProvision.length; j++) {
        // Create legal provision object with necessary properties and check if it needs to be added
        this.addDocumentIfNotContained_({
          'Title': legalProvision[j]['Title'],
          'OfficialNumber': legalProvision[j]['OfficialNumber'],
          'ArticleNumber': legalProvision[j]['ArticleNumber'] || [],
          'Article': legalProvision[j]['Article'] || [],
          'TextAtWeb': legalProvision[j]['TextAtWeb']
        }, legalProvisions);
        // Add possible references to the documents
        var references = legalProvision[j]['Reference'];
        if (angular.isArray(references)) {
          this.addDocumentsIfNotContained_(references, documents);
        }
      }
    }
    // Add possible references for the real estate to the documents
    this.addDocumentsIfNotContained_(this.getRealEstate()['Reference'], documents);
    return {
      'LegalProvisions': legalProvisions,
      'Documents': documents
    };
  }
  return undefined;
};

/**
 * Returns the responsible offices of the specified topic.
 * @param {string} themeCode The code of the topic to return the responsible offices for.
 * @returns {Array|undefined} The responsible offices of the specified topic.
 */
oereb.ExtractService.prototype.getResponsibleOffices = function(themeCode) {
  var restrictions = this.getRestrictions(themeCode);
  if (angular.isArray(restrictions)) {
    var offices = [];
    for (var i = 0; i < restrictions.length; i++) {
      this.addIfNotContains_(restrictions[i]['ResponsibleOffice'], offices);
    }
    return offices;
  }
  return undefined;
};

/**
 * Creates a view service definition using the restriction's theme code and view service URL.
 * @param {string} themeCode The restriction's theme code.
 * @param {string} viewServiceUrl The restriction's view service URL.
 * @returns {Object} The created view service definition.
 * @private
 */
oereb.ExtractService.prototype.getViewServiceFromUrl_ = function(themeCode, viewServiceUrl) {
  var parts = viewServiceUrl.split('?');
  var url = parts[0];
  var definition = {
    'topic': themeCode,
    'url': url,
    'params': {}
  };
  var params = parts[1].split('&');
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0].toUpperCase() === 'LAYERS') {
      definition['params']['LAYERS'] = param[1];
    }
    else if (param[0].toUpperCase() === 'STYLES') {
      definition['params']['STYLES'] = param[1];
    }
    else if (param[0].toUpperCase() === 'VERSION') {
      definition['params']['VERSION'] = param[1];
    }
  }
  return definition;
};

/**
 * Returns a unique list of view services available in the extract.
 * @returns {Array} A unique list of view service objects.
 */
oereb.ExtractService.prototype.getViewServices = function() {
  var viewServices = [];
  var realEstate = this.getRealEstate();
  if (angular.isDefined(realEstate)) {
    var restrictions = realEstate['RestrictionOnLandownership'];
    if (angular.isArray(restrictions)) {
      for (var i = 0; i < restrictions.length; i++) {
        var url = restrictions[i]['Map']['ReferenceWMS'];
        if (angular.isDefined(url)) {
          this.addIfNotContains_(
            this.getViewServiceFromUrl_(restrictions[i]['Theme']['Code'], url),
            viewServices
          );
        }
      }
    }
  }
  return viewServices;
};

/**
 * Returns the exclusions of liability for the current extract.
 * @returns {Array} The exclusions of liability.
 */
oereb.ExtractService.prototype.getExclusionsOfLiability = function() {
  if (angular.isDefined(this.getExtract()) && angular.isArray(this.getExtract()['ExclusionOfLiability'])) {
    return this.getExtract()['ExclusionOfLiability'];
  }
  return [];
};

/**
 * Returns the glossary for the current extract.
 * @returns {Array} The exclusions of liability.
 */
oereb.ExtractService.prototype.getGlossary = function() {
  if (angular.isDefined(this.getExtract()) && angular.isArray(this.getExtract()['Glossary'])) {
    return this.getExtract()['Glossary'];
  }
  return [];
};

/**
 * Returns the embeddable if available.
 * @returns {Object|undefined} The extract object or undefined.
 */
oereb.ExtractService.prototype.getEmbeddable = function() {
  return this.embeddable_;
};

oereb.module.service('ExtractService', oereb.ExtractService);
