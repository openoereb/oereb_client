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
