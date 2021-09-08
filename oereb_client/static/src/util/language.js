export const getLocalizedText = function(multilingualText, language) {
    if (multilingualText.length > 0) {
        for (let i = 0; i < multilingualText.length; i++) {
            if (multilingualText[i]['Language'] === language) {
                return multilingualText[i]['Text'];
            }
        }
        return multilingualText[0]['Text'];
    }
    return '';
};
