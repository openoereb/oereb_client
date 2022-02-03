import {getLocalizedText, getLocalizedUrl} from "../../../oereb_client/static/src/util/language";

describe('getLocalizedText', () => {
  const multilingualText = [
    {
      Language: 'de',
      Text: 'Deutsch'
    },
    {
      Language: 'en',
      Text: 'English'
    }
  ];

  it('should return null', () => {
    expect(getLocalizedText([], 'en', 'en')).toBe(null);
  });

  it('should return default language', () => {
    expect(getLocalizedText(multilingualText, 'fr', 'en')).toEqual('English');
  });

  it('should return specified language', () => {
    expect(getLocalizedText(multilingualText, 'de', 'en')).toEqual('Deutsch');
  });

  it('should return first language', () => {
    expect(getLocalizedText(multilingualText, 'fr', 'it')).toEqual('Deutsch');
  });
});

describe('getLocalizedUrl', () => {
  const multilingualUrl = [
    {
      Language: 'de',
      URL: 'http://example.com/de'
    },
    {
      Language: 'en',
      URL: 'http://example.com/en'
    }
  ];

  it('should return null', () => {
    expect(getLocalizedUrl([], 'en', 'en')).toBe(null);
  });

  it('should return default language', () => {
    expect(getLocalizedUrl(multilingualUrl, 'fr', 'en')).toEqual('http://example.com/en');
  });

  it('should return specified language', () => {
    expect(getLocalizedUrl(multilingualUrl, 'de', 'en')).toEqual('http://example.com/de');
  });

  it('should return first language', () => {
    expect(getLocalizedUrl(multilingualUrl, 'fr', 'it')).toEqual('http://example.com/de');
  });
});
