angular
// Injecting into our app module
  .module('docs')

  // Creating an Angular constant and rendering a list of items as JSON
  .constant('API_DATA', [
  {
    "name": "oereb",
    "stateName": "oereb",
    "type": "module",
    "outputPath": "partials/api/oereb.html",
    "url": "api/oereb",
    "docs": [
      {
        "name": "MainController",
        "stateName": "mainController",
        "type": "function",
        "outputPath": "partials/api/oereb/function/MainController.html",
        "url": "api/oereb/function/MainController"
      },
      {
        "name": "TopicController",
        "stateName": "topicController",
        "type": "function",
        "outputPath": "partials/api/oereb/function/TopicController.html",
        "url": "api/oereb/function/TopicController"
      },
      {
        "name": "oerebConcernedTheme",
        "stateName": "oerebConcernedTheme",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebConcernedTheme.html",
        "url": "api/oereb/directive/oerebConcernedTheme"
      },
      {
        "name": "oerebExclusionOfLiability",
        "stateName": "oerebExclusionOfLiability",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebExclusionOfLiability.html",
        "url": "api/oereb/directive/oerebExclusionOfLiability"
      },
      {
        "name": "oerebExtractMenu",
        "stateName": "oerebExtractMenu",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebExtractMenu.html",
        "url": "api/oereb/directive/oerebExtractMenu"
      },
      {
        "name": "oerebGeneralInformation",
        "stateName": "oerebGeneralInformation",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebGeneralInformation.html",
        "url": "api/oereb/directive/oerebGeneralInformation"
      },
      {
        "name": "oerebGlossary",
        "stateName": "oerebGlossary",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebGlossary.html",
        "url": "api/oereb/directive/oerebGlossary"
      },
      {
        "name": "oerebHistory",
        "stateName": "oerebHistory",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebHistory.html",
        "url": "api/oereb/directive/oerebHistory"
      },
      {
        "name": "oerebInformationPanel",
        "stateName": "oerebInformationPanel",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebInformationPanel.html",
        "url": "api/oereb/directive/oerebInformationPanel"
      },
      {
        "name": "oerebLegalDocuments",
        "stateName": "oerebLegalDocuments",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebLegalDocuments.html",
        "url": "api/oereb/directive/oerebLegalDocuments"
      },
      {
        "name": "oerebLegend",
        "stateName": "oerebLegend",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebLegend.html",
        "url": "api/oereb/directive/oerebLegend"
      },
      {
        "name": "oerebMapQuery",
        "stateName": "oerebMapQuery",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebMapQuery.html",
        "url": "api/oereb/directive/oerebMapQuery"
      },
      {
        "name": "oerebNotConcernedTheme",
        "stateName": "oerebNotConcernedTheme",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebNotConcernedTheme.html",
        "url": "api/oereb/directive/oerebNotConcernedTheme"
      },
      {
        "name": "oerebRealEstate",
        "stateName": "oerebRealEstate",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebRealEstate.html",
        "url": "api/oereb/directive/oerebRealEstate"
      },
      {
        "name": "oerebResponsibleOffice",
        "stateName": "oerebResponsibleOffice",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebResponsibleOffice.html",
        "url": "api/oereb/directive/oerebResponsibleOffice"
      },
      {
        "name": "oerebSearch",
        "stateName": "oerebSearch",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebSearch.html",
        "url": "api/oereb/directive/oerebSearch"
      },
      {
        "name": "oerebSettings",
        "stateName": "oerebSettings",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebSettings.html",
        "url": "api/oereb/directive/oerebSettings"
      },
      {
        "name": "oerebStaticExtract",
        "stateName": "oerebStaticExtract",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebStaticExtract.html",
        "url": "api/oereb/directive/oerebStaticExtract"
      },
      {
        "name": "oerebThemeWithoutData",
        "stateName": "oerebThemeWithoutData",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebThemeWithoutData.html",
        "url": "api/oereb/directive/oerebThemeWithoutData"
      },
      {
        "name": "oerebTopic",
        "stateName": "oerebTopic",
        "type": "directive",
        "outputPath": "partials/api/oereb/directive/oerebTopic.html",
        "url": "api/oereb/directive/oerebTopic"
      },
      {
        "name": "format",
        "stateName": "format",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/format.html",
        "url": "api/oereb/filter/format"
      },
      {
        "name": "mark",
        "stateName": "mark",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/mark.html",
        "url": "api/oereb/filter/mark"
      },
      {
        "name": "multilingualText",
        "stateName": "multilingualText",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/multilingualText.html",
        "url": "api/oereb/filter/multilingualText"
      },
      {
        "name": "replace",
        "stateName": "replace",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/replace.html",
        "url": "api/oereb/filter/replace"
      },
      {
        "name": "searchInformation",
        "stateName": "searchInformation",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/searchInformation.html",
        "url": "api/oereb/filter/searchInformation"
      },
      {
        "name": "searchResult",
        "stateName": "searchResult",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/searchResult.html",
        "url": "api/oereb/filter/searchResult"
      },
      {
        "name": "orderGlossary",
        "stateName": "orderGlossary",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/orderGlossary.html",
        "url": "api/oereb/filter/orderGlossary"
      },
      {
        "name": "sortLegend",
        "stateName": "sortLegend",
        "type": "filter",
        "outputPath": "partials/api/oereb/filter/sortLegend.html",
        "url": "api/oereb/filter/sortLegend"
      },
      {
        "name": "EgridService",
        "stateName": "egridService",
        "type": "service",
        "outputPath": "partials/api/oereb/service/EgridService.html",
        "url": "api/oereb/service/EgridService"
      },
      {
        "name": "ExtractService",
        "stateName": "extractService",
        "type": "service",
        "outputPath": "partials/api/oereb/service/ExtractService.html",
        "url": "api/oereb/service/ExtractService"
      },
      {
        "name": "MapService",
        "stateName": "mapService",
        "type": "service",
        "outputPath": "partials/api/oereb/service/MapService.html",
        "url": "api/oereb/service/MapService"
      },
      {
        "name": "SearchService",
        "stateName": "searchService",
        "type": "service",
        "outputPath": "partials/api/oereb/service/SearchService.html",
        "url": "api/oereb/service/SearchService"
      },
      {
        "name": "StoreService",
        "stateName": "storeService",
        "type": "service",
        "outputPath": "partials/api/oereb/service/StoreService.html",
        "url": "api/oereb/service/StoreService"
      }
    ]
  }
]);