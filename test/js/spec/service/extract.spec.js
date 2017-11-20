goog.require('oereb');
goog.require('oereb.ExtractService');

describe('ExtractService', function() {

  beforeEach(angular.mock.module('oereb', function($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com/');
  }));

  var $httpBackend, ExtractService;

  beforeEach(inject(function(_ExtractService_, _$httpBackend_) {
    ExtractService = _ExtractService_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function () {
    $httpBackend.whenGET('http://example.com/extract/reduced/json/geometry/CH1234').respond(
      function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'base/samples/extract.json', false);
        request.send(null);
        return [request.status, request.response, {}];
      }
    );
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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST')
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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, {
        GetExtractByIdResponse: 'invalid'
      });
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

    it('should return the received extract', function() {
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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getConcernedThemes().length).toBe(2);
      expect(ExtractService.getConcernedThemes()[0]['Code']).toEqual('topic1');
      expect(ExtractService.getConcernedThemes()[1]['Code']).toEqual('topic2');
    });

  });

  describe('getNotConcernedThemes', function() {

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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getNotConcernedThemes().length).toBe(2);
      expect(ExtractService.getNotConcernedThemes()[0]['Code']).toEqual('topic1');
      expect(ExtractService.getNotConcernedThemes()[1]['Code']).toEqual('topic2');
    });

  });

  describe('getThemesWithoutData', function() {

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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
      ExtractService.queryExtractById('CHTEST');
      $httpBackend.flush();
      expect(ExtractService.getThemesWithoutData().length).toBe(2);
      expect(ExtractService.getThemesWithoutData()[0]['Code']).toEqual('topic1');
      expect(ExtractService.getThemesWithoutData()[1]['Code']).toEqual('topic2');
    });

  });

  describe('getRealEstate', function() {

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
      $httpBackend.expectGET('http://example.com/extract/reduced/json/geometry/CHTEST').respond(200, data);
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
      expect(ExtractService.getRestrictions('ContaminatedPublicTransportSites')[0]['Area']).toBe(7824.68);
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
      expect(graphics.length).toBe(1);
      expect(entries[0]['Area']).toBe(13652.36);
      expect(entries[0]['PartInPercent']).toBe(37.7);
      expect(entries[0]['Length']).toBeUndefined();
      expect(entries[1]['Area']).toBeUndefined();
      expect(entries[1]['PartInPercent']).toBeUndefined();
      expect(entries[1]['Length']).toBe(462.57);
      expect(entries[2]['Area']).toBeUndefined();
      expect(entries[2]['PartInPercent']).toBeUndefined();
      expect(entries[2]['Length']).toBeUndefined();
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
      var list = [];
      ExtractService.addDocumentIfNotContained_({
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
      }, list);
      expect(list.length).toBe(1);
      expect(list[0].ArticleNumber.length).toBe(1);
      expect(list[0].Article.length).toBe(1);
    });

    it('should append articles and article numbers', function() {
      var list = [];
      var doc1 = {
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
      ExtractService.addDocumentIfNotContained_(doc1, list);
      expect(list.length).toBe(1);
      expect(list[0].ArticleNumber.length).toBe(1);
      expect(list[0].Article.length).toBe(1);
      ExtractService.addDocumentIfNotContained_(doc2, list);
      expect(list.length).toBe(1);
      expect(list[0].ArticleNumber.length).toBe(2);
      expect(list[0].Article.length).toBe(2);
    });

    it('should merge attachments', function() {
      var list = [];
      var doc1 = {
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: ['link1'],
        ArticleNumber: [],
        Article: []
      };
      var doc2 = {
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: ['link2'],
        ArticleNumber: [],
        Article: []
      };
      ExtractService.addDocumentIfNotContained_(doc1, list);
      expect(list.length).toBe(1);
      expect(list[0].TextAtWeb.length).toBe(1);
      ExtractService.addDocumentIfNotContained_(doc2, list);
      expect(list.length).toBe(1);
      expect(list[0].TextAtWeb.length).toBe(2);
    });

  });

  describe('addDocumentsIfNotContained_', function() {

    var documents = [
      {
        Title: 'doc1',
        OfficialNumber: 'number1',
        TextAtWeb: 'link1',
        ArticleNumber: [],
        Article: []
      },
      {
        Title: 'doc2',
        OfficialNumber: 'number2',
        TextAtWeb: 'link2',
        ArticleNumber: [],
        Article: [],
        Reference: [
          {
            Title: 'doc1',
            OfficialNumber: 'number1',
            TextAtWeb: 'link1',
            ArticleNumber: [],
            Article: []
          },
          {
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
      var result = [];
      ExtractService.addDocumentsIfNotContained_(documents, result);
      expect(result.length).toBe(3);
      for (var i = 0; i < result.length; i++) {
        expect(result[i]['Title']).toEqual('doc' + (i + 1));
        expect(result[i]['TextAtWeb']).toEqual(['link' + (i + 1)]);
      }
    });

  });

  describe('getDocuments', function() {

    var restrictions = [
      {
        LegalProvisions: [
          {
            Title: 'prov1',
            TextAtWeb: 'link1',
            Reference: [
              {
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
      expect(result['LegalProvisions'].length).toBe(1);
      expect(result['LegalProvisions'][0]['Title']).toEqual('prov1');
      expect(result['LegalProvisions'][0]['TextAtWeb']).toEqual(['link1']);
      expect(result['Documents'].length).toBe(2);
      for (var i = 0; i < result['Documents'].length; i++) {
        expect(result['Documents'][i]['Title']).toEqual('doc' + (i + 1));
        expect(result['Documents'][i]['TextAtWeb']).toEqual(['link' + (i + 1)]);
      }
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
      var topic = 'test';
      var url = 'http://example.com/wms?SERVICE=WMS&version=1.1.1&Layers=layer1,layer2&STYLES=default';
      var viewService = ExtractService.getViewServiceFromUrl_(topic, url);
      expect(viewService).toEqual({
        topic: 'test',
        url: 'http://example.com/wms',
        params: {
          VERSION: '1.1.1',
          LAYERS: 'layer1,layer2',
          STYLES: 'default'
        }
      });
    });

  });

  describe('getViewServices', function() {

    it('should return empty array if no extract is available', function() {
      expect(ExtractService.getViewServices()).toEqual([]);
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
      expect(viewServices.length).toBe(2);
      expect(viewServices[0].topic).toEqual('topic1');
      expect(viewServices[1].topic).toEqual('topic2');
      expect(viewServices[0].url).toEqual('http://example.com/wms');
      expect(viewServices[1].url).toEqual('http://example.com/wms');
      expect(viewServices[0].params).toEqual({
        VERSION: '1.1.1',
        LAYERS: 'layer1',
        STYLES: 'default'
      });
      expect(viewServices[1].params).toEqual({
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

});