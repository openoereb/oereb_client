goog.require('oereb');
goog.require('oereb.ExtractService');

describe('ExtractService', function() {

  beforeEach(module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
  }));

  var $httpBackend, ExtractService, dc;

  beforeEach(inject(function(_ExtractService_, _$httpBackend_) {
    ExtractService = _ExtractService_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function() {
    jasmine.clock().install();
    var baseTime = new Date(2018, 1, 1);
    jasmine.clock().mockDate(baseTime);
    dc = baseTime.getTime();
  });

  beforeEach(function () {
    $httpBackend.whenGET('http://example.com/extract/reduced/json/geometry/CH1234?_dc=' + dc).respond(
      function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'base/samples/extract.json', false);
        request.send(null);
        return [request.status, request.response, {}];
      }
    );
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getExtract and getEmbeddable', function() {

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getExtract()).toBeUndefined();
      expect(ExtractService.getEmbeddable()).toBeUndefined();
    });

    it('should return error on failed request', function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(500, 'Test error.');
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Requesting extract for CHTEST failed. Test error.');
    });

    it('should return error on invalid response format', function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc).respond(
        200,
        {
          GetExtractByIdResponse: 'invalid'
        }
      );
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Invalid response format.');
    });

    it('should return error on failed validation', function() {
      spyOn(ExtractService, 'validate_').and.returnValue(false);
      var data = {
        GetExtractByIdResponse: {
          extract: {
            RealEstate: {
              Number: '1234',
              IdentDN: 'SAMPLE',
              EGRID: 'CH1234'
            }
          },
          embeddable: {
            test: 'Test'
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc).respond(
        200,
        data
      );
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(angular.isString(response)).toBe(true);
      expect(response).toEqual('Extract validation failed.');
    });

    it('should return the received extract', function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
      var data = {
        GetExtractByIdResponse: {
          extract: {
            RealEstate: {
              Number: '1234',
              IdentDN: 'SAMPLE',
              EGRID: 'CH1234'
            }
          },
          embeddable: {
            test: 'Test'
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      var response = undefined;
      ExtractService.queryExtractById('CHTEST').then(
        function(data) {
          response = data;
        },
        function(data) {
          response = data;
        }
      );
      $httpBackend.flush();
      expect(response).toEqual(data['GetExtractByIdResponse']);
      expect(ExtractService.getExtract()).toEqual(data['GetExtractByIdResponse']['extract']);
      expect(ExtractService.getEmbeddable()).toEqual(data['GetExtractByIdResponse']['embeddable']);
    });

  });

  describe('getConcernedThemes', function() {

    beforeEach(function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
    });

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getConcernedThemes()).toBeUndefined();
    });

    it('should return the concerned themes', function() {
      var data = {
        GetExtractByIdResponse: {
          extract: {
            ConcernedTheme: [
              {
                Code: 'topic1'
              },
              {
                Code: 'topic2'
              }
            ]
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getConcernedThemes().length).toBe(2);
      expect(ExtractService.getConcernedThemes()[0]['Code']).toEqual('topic1');
      expect(ExtractService.getConcernedThemes()[1]['Code']).toEqual('topic2');
    });

  });

  describe('getNotConcernedThemes', function() {

    beforeEach(function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
    });

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getNotConcernedThemes()).toBeUndefined();
    });

    it('should return the not concerned themes', function() {
      var data = {
        GetExtractByIdResponse: {
          extract: {
            NotConcernedTheme: [
              {
                Code: 'topic1'
              },
              {
                Code: 'topic2'
              }
            ]
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getNotConcernedThemes().length).toBe(2);
      expect(ExtractService.getNotConcernedThemes()[0]['Code']).toEqual('topic1');
      expect(ExtractService.getNotConcernedThemes()[1]['Code']).toEqual('topic2');
    });

  });

  describe('getThemesWithoutData', function() {

    beforeEach(function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
    });

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getThemesWithoutData()).toBeUndefined();
    });

    it('should return the concerned themes', function() {
      var data = {
        GetExtractByIdResponse: {
          extract: {
            ThemeWithoutData: [
              {
                Code: 'topic1'
              },
              {
                Code: 'topic2'
              }
            ]
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getThemesWithoutData().length).toBe(2);
      expect(ExtractService.getThemesWithoutData()[0]['Code']).toEqual('topic1');
      expect(ExtractService.getThemesWithoutData()[1]['Code']).toEqual('topic2');
    });

  });

  describe('getRealEstate', function() {

    beforeEach(function() {
      spyOn(ExtractService, 'validate_').and.returnValue(true);
    });

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getRealEstate()).toBeUndefined();
    });

    it('should return the received real estate', function() {
      var data = {
        GetExtractByIdResponse: {
          extract: {
            RealEstate: {
              Number: '1234',
              IdentDN: 'SAMPLE',
              EGRID: 'CH1234'
            }
          }
        }
      };
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST?_dc=' + dc)
        .respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getRealEstate()).toEqual(data['GetExtractByIdResponse']['extract']['RealEstate']);
    });

  });

  describe('getRestrictions', function() {

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getRestrictions('test')).toBeUndefined();
    });

    it('should return the restrictions for the specified topic', function() {
      ExtractService.queryExtractById('CH1234');
      $httpBackend.flush();
      expect(ExtractService.getRestrictions('LandUsePlans')).toEqual([]);
      expect(ExtractService.getRestrictions('ContaminatedPublicTransportSites').length).toBe(5);
      expect(ExtractService.getRestrictions('ContaminatedPublicTransportSites')[0]['AreaShare']).toBe(7824.68);
    });

  });

  describe('getLegend', function() {

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getLegend('test')).toBeUndefined();
    });

    it('should return the restrictions for the specified topic', function() {
      ExtractService.queryExtractById('CH1234');
      $httpBackend.flush();
      expect(ExtractService.getLegend('LandUsePlans')).toEqual({
        'entries': [],
        'graphics': []
      });
      var entries = ExtractService.getLegend('ContaminatedPublicTransportSites')['entries'];
      var graphics = ExtractService.getLegend('ContaminatedPublicTransportSites')['graphics'];
      expect(entries.length).toBe(3);
      expect(graphics.length).toBe(3);
      expect(entries[0]['AreaShare']).toBe(13652.36);
      expect(entries[0]['PartInPercent']).toBe(37.7);
      expect(entries[0]['LengthShare']).toBeUndefined();
      expect(entries[0]['NrOfPoints']).toBeUndefined();
      expect(entries[1]['AreaShare']).toBeUndefined();
      expect(entries[1]['PartInPercent']).toBeUndefined();
      expect(entries[1]['LengthShare']).toBe(462.57);
      expect(entries[1]['NrOfPoints']).toBeUndefined();
      expect(entries[2]['AreaShare']).toBeUndefined();
      expect(entries[2]['PartInPercent']).toBeUndefined();
      expect(entries[2]['LengthShare']).toBeUndefined();
      expect(entries[2]['NrOfPoints']).toBe(1);
      expect(graphics[0]).toContain('GetLegendGraphic');
    });

  });

  describe('addIfNotContains_', function() {

    it('should add an array element if it is missing', function() {
      var list = [];
      ExtractService.addIfNotContains_({
        value1: 'one',
        value2: 'two'
      }, list);
      expect(list.length).toBe(1);
      ExtractService.addIfNotContains_({
        value1: 'three',
        value2: 'four'
      }, list);
      expect(list.length).toBe(2);
      ExtractService.addIfNotContains_({
        value1: 'one',
        value2: 'two'
      }, list);
      expect(list.length).toBe(2);
    });

  });

  describe('addDocumentIfNotContained_', function() {

    it('should add a document if it is missing', function() {
      var target = {
        Law: []
      };
      ExtractService.addDocumentIfNotContained_({
        DocumentType: 'Law',
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: 'link1',
        ArticleNumber: [
          'art1'
        ],
        Article: [
          {
            Text: 'text1'
          }
        ]
      }, target);
      expect(target['Law'].length).toBe(1);
      expect(target['Law'][0].ArticleNumber.length).toBe(1);
      expect(target['Law'][0].Article.length).toBe(1);
    });

    it('should append articles and article numbers', function() {
      var target = {
        Law: []
      };
      var doc1 = {
        DocumentType: 'Law',
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: 'link1',
        ArticleNumber: [
          'art1'
        ],
        Article: [
          {
            Text: 'text1'
          }
        ]
      };
      var doc2 = {
        DocumentType: 'Law',
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: 'link1',
        ArticleNumber: [
          'art2'
        ],
        Article: [
          {
            Text: 'text2'
          }
        ]
      };
      ExtractService.addDocumentIfNotContained_(doc1, target);
      expect(target['Law'].length).toBe(1);
      expect(target['Law'][0].ArticleNumber.length).toBe(1);
      expect(target['Law'][0].Article.length).toBe(1);
      ExtractService.addDocumentIfNotContained_(doc2, target);
      expect(target['Law'].length).toBe(1);
      expect(target['Law'][0].ArticleNumber.length).toBe(2);
      expect(target['Law'][0].Article.length).toBe(2);
    });

    it('should merge attachments', function() {
      var target = {
        Law: []
      };
      var doc1 = {
        DocumentType: 'Law',
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: ['link1'],
        ArticleNumber: [],
        Article: []
      };
      var doc2 = {
        DocumentType: 'Law',
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: ['link2'],
        ArticleNumber: [],
        Article: []
      };
      ExtractService.addDocumentIfNotContained_(doc1, target);
      expect(target['Law'].length).toBe(1);
      expect(target['Law'][0].TextAtWeb.length).toBe(1);
      ExtractService.addDocumentIfNotContained_(doc2, target);
      expect(target['Law'].length).toBe(1);
      expect(target['Law'][0].TextAtWeb.length).toBe(2);
    });

  });

  describe('addDocumentsIfNotContained_', function() {

    var documents = [
      {
        DocumentType: 'Law',
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: 'link1',
        ArticleNumber: [],
        Article: []
      },
      {
        DocumentType: 'Law',
        Title: 'doc2',
        OfficialNumber: 'number2',
        TextAtWeb: 'link2',
        ArticleNumber: [],
        Article: [],
        Reference: [
          {
            DocumentType: 'Law',
            Title: 'doc1',
            OfficialNumber: 'number1',
            TextAtWeb: 'link1',
            ArticleNumber: [],
            Article: []
          },
          {
            DocumentType: 'Law',
            Title: 'doc3',
            OfficialNumber: 'number3',
            TextAtWeb: 'link3',
            ArticleNumber: [],
            Article: []
          }
        ]
      }
    ];

    it('should add each document if it is missing', function() {
      var result = {
        Law: []
      };
      ExtractService.addDocumentsIfNotContained_(documents, result);
      expect(result['Law'].length).toBe(3);
      for (var i = 0; i < result['Law'].length; i++) {
        expect(result['Law'][i]['Title']).toEqual('doc' + (i + 1));
        expect(result['Law'][i]['TextAtWeb']).toEqual(['link' + (i + 1)]);
      }
    });

  });

  describe('getDocuments', function() {

    var restrictions = [
      {
        LegalProvisions: [
          {
            DocumentType: 'LegalProvision',
            Title: 'prov1',
            TextAtWeb: 'link1',
            Reference: [
              {
                DocumentType: 'Law',
                Title: 'doc1',
                TextAtWeb: 'link1'
              }
            ]
          }
        ]
      }
    ];

    var realEstate = {
      Reference: [
        {
          DocumentType: 'Hint',
          Title: 'doc2',
          TextAtWeb: 'link2'
        }
      ]
    };

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getDocuments('test')).toBeUndefined();
    });

    it('should return the legal documents for the specidied topic', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue(realEstate);
      spyOn(ExtractService, 'getRestrictions').and.returnValue(restrictions);
      var result = ExtractService.getDocuments('test');
      expect(result['LegalProvision'].length).toBe(1);
      expect(result['LegalProvision'][0]['Title']).toEqual('prov1');
      expect(result['LegalProvision'][0]['TextAtWeb']).toEqual(['link1']);
      expect(result['Law'].length).toBe(1);
      expect(result['Law'][0]['Title']).toEqual('doc1');
      expect(result['Law'][0]['TextAtWeb']).toEqual(['link1']);
      expect(result['Hint'].length).toBe(1);
      expect(result['Hint'][0]['Title']).toEqual('doc2');
      expect(result['Hint'][0]['TextAtWeb']).toEqual(['link2']);
    });

  });

  describe('getResponsibleOffices', function() {

    var restrictions = [
      {
        ResponsibleOffice: 'office1'
      },
      {
        ResponsibleOffice: 'office2'
      },
      {
        ResponsibleOffice: 'office1'
      }
    ];

    it('should return undefined if no extract is available', function() {
      expect(ExtractService.getResponsibleOffices('test')).toBeUndefined();
    });

    it('should return the responsible offices for the specified topic', function() {
      spyOn(ExtractService, 'getRestrictions').and.returnValue(restrictions);
      var offices = ExtractService.getResponsibleOffices('test');
      expect(offices.length).toBe(2);
      expect(offices[0]).toEqual('office1');
      expect(offices[1]).toEqual('office2');
    });

  });

  describe('getViewServiceFromUrl_', function() {

    it('should return a view service definition for the specified url and topic', function() {
      var mapObject = {
        ReferenceWMS: 'http://example.com/wms?SERVICE=WMS&version=1.1.1&Layers=layer1,layer2&STYLES=default',
        layerOpacity: 0.5,
        layerIndex: 1
      };
      var viewService = ExtractService.getViewServiceFromUrl_(mapObject);
      expect(viewService).toEqual({
        url: 'http://example.com/wms',
        params: {
          VERSION: '1.1.1',
          LAYERS: 'layer1,layer2',
          STYLES: 'default'
        },
        opacity: 0.5,
        zIndex: 1
      });
    });

    it('should pass NS95', function() {
      var mapObject = {
        ReferenceWMS: 'http://example.com/wms?SERVICE=WMS&version=1.1.1&Layers=layer1,layer2&STYLES=default',
        layerOpacity: 0.5,
        layerIndex: 1,
        min_NS95: {
          crs: 'EPSG:2056',
          coordinates: [1, 2]
        },
        max_NS95: {
          crs: 'EPSG:2056',
          coordinates: [3, 4]
        }
      };
      var viewService = ExtractService.getViewServiceFromUrl_(mapObject);
      expect(viewService).toEqual({
        url: 'http://example.com/wms',
        params: {
          VERSION: '1.1.1',
          LAYERS: 'layer1,layer2',
          STYLES: 'default'
        },
        opacity: 0.5,
        zIndex: 1,
        extent: [1, 2, 3, 4]
      });
    });

    it('should pass NS03', function() {
      var mapObject = {
        ReferenceWMS: 'http://example.com/wms?SERVICE=WMS&version=1.1.1&Layers=layer1,layer2&STYLES=default',
        layerOpacity: 0.5,
        layerIndex: 1,
        min_NS03: {
          crs: 'EPSG:21781',
          coordinates: [1, 2]
        },
        max_NS03: {
          crs: 'EPSG:21781',
          coordinates: [3, 4]
        }
      };
      var viewService = ExtractService.getViewServiceFromUrl_(mapObject);
      expect(viewService).toEqual({
        url: 'http://example.com/wms',
        params: {
          VERSION: '1.1.1',
          LAYERS: 'layer1,layer2',
          STYLES: 'default'
        },
        opacity: 0.5,
        zIndex: 1,
        extent: [2000001, 1000002, 2000003, 1000004]
      });
    });

  });

  describe('getViewServices', function() {

    it('should return empty object if no extract is available', function() {
      expect(ExtractService.getViewServices()).toEqual({});
    });

    it('should return a unique list of view service definitions', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        RestrictionOnLandownership: [
          {
            Theme: {
              Code: 'topic1'
            },
            Map: {
              ReferenceWMS: 'http://example.com/wms?SERVICE=WMS&VERSION=1.1.1&LAYERS=layer1&STYLES=default'
            }
          },
          {
            Theme: {
              Code: 'topic2'
            },
            Map: {
              ReferenceWMS: 'http://example.com/wms?SERVICE=WMS&VERSION=1.1.1&LAYERS=layer2&STYLES=default'
            }
          },
          {
            Theme: {
              Code: 'topic1'
            },
            Map: {
              ReferenceWMS: 'http://example.com/wms?SERVICE=WMS&VERSION=1.1.1&LAYERS=layer1&STYLES=default'
            }
          }
        ]
      });
      var viewServices = ExtractService.getViewServices();
      expect(Object.keys(viewServices).length).toBe(2);
      expect(viewServices['topic1']).toBeDefined();
      expect(viewServices['topic2']).toBeDefined();
      expect(viewServices['topic1'][0].url).toEqual('http://example.com/wms');
      expect(viewServices['topic2'][0].url).toEqual('http://example.com/wms');
      expect(viewServices['topic1'][0].params).toEqual({
        VERSION: '1.1.1',
        LAYERS: 'layer1',
        STYLES: 'default'
      });
      expect(viewServices['topic2'][0].params).toEqual({
        VERSION: '1.1.1',
        LAYERS: 'layer2',
        STYLES: 'default'
      });
    });

  });

  describe('getExclusionsOfLiability', function() {

    it('should return empty array if no extract is available', function() {
      expect(ExtractService.getExclusionsOfLiability()).toEqual([]);
    });

    it('should return empty array if no exclusions are defined', function() {
      spyOn(ExtractService, 'getExtract').and.returnValue({
        ExclusionOfLiability: 'invalid'
      });
      expect(ExtractService.getExclusionsOfLiability()).toEqual([]);
    });

    it('should the exclusions of liability', function() {
      spyOn(ExtractService, 'getExtract').and.returnValue({
        ExclusionOfLiability: [
          'dummy1',
          'dummy2'
        ]
      });
      expect(ExtractService.getExclusionsOfLiability().length).toBe(2);
      expect(ExtractService.getExclusionsOfLiability()[0]).toEqual('dummy1');
      expect(ExtractService.getExclusionsOfLiability()[1]).toEqual('dummy2');
    });

  });

  describe('getGlossary', function() {

    it('should return empty array if no extract is available', function() {
      expect(ExtractService.getGlossary()).toEqual([]);
    });

    it('should return empty array if no glossary is defined', function() {
      spyOn(ExtractService, 'getExtract').and.returnValue({
        Glossary: 'invalid'
      });
      expect(ExtractService.getGlossary()).toEqual([]);
    });

    it('should the exclusions of liability', function() {
      spyOn(ExtractService, 'getExtract').and.returnValue({
        Glossary: [
          'dummy1',
          'dummy2'
        ]
      });
      expect(ExtractService.getGlossary().length).toBe(2);
      expect(ExtractService.getGlossary()[0]).toEqual('dummy1');
      expect(ExtractService.getGlossary()[1]).toEqual('dummy2');
    });

  });

  describe('validate_', function() {

    it('should return true', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        RestrictionOnLandownership: [
          {
            LegalProvisions: [
              {
                DocumentType: 'LegalProvision'
              }
            ]
          }
        ]
      });
      expect(ExtractService.validate_()).toBe(true);
    });

    it('should return false on invalid restrictions', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        RestrictionOnLandownership: 'invalid'
      });
      expect(ExtractService.validate_()).toBe(false);
    });

    it('should return true on missing restrictions', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({});
      expect(ExtractService.validate_()).toBe(true);
    });

    it('should return false on undefined legal provisions', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        RestrictionOnLandownership: [
          {}
        ]
      });
      expect(ExtractService.validate_()).toBe(false);
    });

    it('should return false on empty legal provisions array', function() {
      spyOn(ExtractService, 'getRealEstate').and.returnValue({
        RestrictionOnLandownership: [
          {
            LegalProvisions: []
          }
        ]
      });
      expect(ExtractService.validate_()).toBe(false);
    });

  });

});