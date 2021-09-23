import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import {reactI18nextModule} from "react-i18next";

i18n
  .use(detector)
  .use(backend)
  .use(reactI18nextModule)
  .init({
    ns: ['locale'],
    defaultNS: 'locale',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    },
    backend: {
      loadPath: '/static/i18n/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;
