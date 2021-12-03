import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import {initReactI18next} from "react-i18next";

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    ns: ['locale'],
    defaultNS: 'locale',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: window.applicationUrl + 'static/i18n/{{lng}}/{{ns}}.json'
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
