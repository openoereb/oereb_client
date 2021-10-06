export const getLocalizedText = function (multilingualText, language, defaultLanguage) {
  if (multilingualText.length > 0) {
    let defaultValue = null;
    for (let i = 0; i < multilingualText.length; i++) {
      if (multilingualText[i]['Language'] === language) {
        return multilingualText[i]['Text'];
      }
      else if (multilingualText[i]['Language'] === defaultLanguage) {
        defaultValue = multilingualText[i]['Text'];
      }
    }
    if (defaultValue) {
      return defaultValue;
    }
    return multilingualText[0]['Text'];
  }
  return null;
};

export const getLocalizedUrl = function (multilingualUrl, language, defaultLanguage) {
  if (multilingualUrl.length > 0) {
    let defaultValue = null;
    for (let i = 0; i < multilingualUrl.length; i++) {
      if (multilingualUrl[i]['Language'] === language) {
        return multilingualUrl[i]['URL'];
      }
      else if (multilingualUrl[i]['Language'] === defaultLanguage) {
        defaultValue = multilingualUrl[i]['URL'];
      }
    }
    if (defaultValue) {
      return defaultValue;
    }
    return multilingualUrl[0]['URL'];
  }
  return null;
};
