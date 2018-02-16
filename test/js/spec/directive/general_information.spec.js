goog.require('oereb.generalInformationDirective');

describe('generalInformationDirective', function () {

  beforeEach(module('oereb', function ($provide) {
    $provide.constant('oerebApplicationUrl', 'http://example.com');
    $provide.constant('oerebDefaultLanguage', 'de');
  }));

  var $compile, $rootScope, ExtractService, oerebEventExtractLoaded;

  beforeEach(inject(function (_$compile_, _$rootScope_, _ExtractService_, _oerebEventExtractLoaded_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    ExtractService = _ExtractService_;
    oerebEventExtractLoaded = _oerebEventExtractLoaded_;
  }));

  var extract = {
    PLRCadastreAuthority: {
      Name: [
        {
          Text: 'Katasterbehörde',
          Language: 'de'
        }
      ],
      Line1: 'Zeile 1',
      Line2: 'Zeile 2',
      Street: 'Teststrasse',
      Number: '1',
      City: 'Testwil',
      PostalCode: 1234,
      OfficeAtWeb: 'http://www.cadastre.ch/oereb'
    },
    CantonalLogoRef: 'base/samples/static/logo_canton.png',
    FederalLogoRef: 'base/samples/static/logo_confederation.png',
    MunicipalityLogoRef: 'base/samples/static/diegten.png',
    BaseData: [
      {
        Text: 'Grundlagedaten',
        Language: 'de'
      }
    ],
    GeneralInformation: [
      {
        Text: 'Allgemeine Hinweise',
        Language: 'de'
      }
    ],
    RealEstate: {
      Municipality: 'Testwil'
    }
  };

  describe('template', function () {

    it('should be rendered', function () {
      spyOn(ExtractService, 'getExtract').and.returnValue(extract);
      var element = $compile(
        '<oereb-general-information></oereb-general-information>'
      )($rootScope);
      $rootScope.$digest();
      expect(element.find('h4').length).toBe(4);
      expect(element.find('blockquote').length).toBe(4);
      expect(element.find('h4').eq(0).children('strong').first().text()).toContain('Katasterführende Stelle');
      expect(element.find('h4').eq(1).children('strong').first().text()).toContain('Grundlagedaten');
      expect(element.find('h4').eq(2).children('strong').first().text())
        .toContain('Allgemeine Informationen');
      expect(element.find('h4').eq(3).children('strong').first().text())
        .toContain('Weiterhin an diesem Auszug beteiligt sind');
      var office = element.children('blockquote').eq(0);
      expect(office.find('img').length).toBe(1);
      expect(office.find('img').first().attr('src')).toEqual(extract.CantonalLogoRef);
      expect(office.find('a').first().attr('href')).toEqual(extract.PLRCadastreAuthority.OfficeAtWeb);
      expect(office.find('dt').length).toBe(1);
      expect(office.find('dt').first().text()).toContain(extract.PLRCadastreAuthority.Name[0].Text);
      expect(office.find('dd').length).toBe(5);
      expect(office.find('dd').eq(0).text()).toContain(extract.PLRCadastreAuthority.Line1);
      expect(office.find('dd').eq(1).text()).toContain(extract.PLRCadastreAuthority.Line2);
      expect(office.find('dd').eq(2).text()).toContain(extract.PLRCadastreAuthority.Street);
      expect(office.find('dd').eq(2).text()).toContain(extract.PLRCadastreAuthority.Number);
      expect(office.find('dd').eq(3).text()).toContain(extract.PLRCadastreAuthority.PostalCode);
      expect(office.find('dd').eq(3).text()).toContain(extract.PLRCadastreAuthority.City);
      expect(office.find('dd').eq(4).children('a').length).toBe(1);
      expect(office.find('dd').eq(4).children('a').first().text())
        .toContain(extract.PLRCadastreAuthority.OfficeAtWeb);
      expect(office.find('dd').eq(4).children('a').first().attr('href'))
        .toEqual(extract.PLRCadastreAuthority.OfficeAtWeb);
      expect(element.children('blockquote').eq(1).children('p').length).toEqual(1);
      expect(element.children('blockquote').eq(2).children('p').length).toEqual(1);
      expect(element.children('blockquote').eq(3).children('div').length).toEqual(1);
      expect(element.children('blockquote').eq(1).children('p').first().text())
        .toContain(extract.BaseData[0].Text);
      expect(element.children('blockquote').eq(2).children('p').first().text())
        .toContain(extract.GeneralInformation[0].Text);
      var logos = element.children('blockquote').eq(3).children('div').first();
      expect(logos.hasClass('logos')).toBe(true);
      expect(logos.find('img').length).toBe(2);
      expect(logos.find('img').eq(0).attr('src')).toEqual(extract.FederalLogoRef);
      expect(logos.find('img').eq(1).attr('src')).toEqual(extract.MunicipalityLogoRef);
      expect(logos.find('span').length).toBe(1);
      expect(logos.find('span').first().text()).toEqual(extract.RealEstate.Municipality);
    });

  });

  describe('extract loaded event', function () {

    it('should update the data', function () {
      var data = true;
      spyOn(ExtractService, 'getExtract').and.callFake(function() {
        return data ? extract : undefined;
      });
      var element = $compile(
        '<oereb-general-information></oereb-general-information>'
      )($rootScope);
      $rootScope.$digest();
      var scope = element.isolateScope();
      expect(scope.office).toEqual(extract.PLRCadastreAuthority);
      expect(scope.logoCan).toEqual(extract.CantonalLogoRef);
      expect(scope.logoFed).toEqual(extract.FederalLogoRef);
      expect(scope.logoMun).toEqual(extract.MunicipalityLogoRef);
      expect(scope.baseData).toEqual(extract.BaseData);
      expect(scope.generalInformation).toEqual(extract.GeneralInformation);
      data = false;
      $rootScope.$broadcast(oerebEventExtractLoaded);
      $rootScope.$apply();
      expect(scope.office).toBeUndefined();
      expect(scope.logoCan).toBeUndefined();
      expect(scope.logoFed).toBeUndefined();
      expect(scope.logoMun).toBeUndefined();
      expect(scope.baseData).toEqual([]);
      expect(scope.generalInformation).toEqual([]);
      expect(ExtractService.getExtract).toHaveBeenCalledTimes(10);
    });

  });

});
