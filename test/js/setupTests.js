import '@testing-library/jest-dom';

import fetchMock from "jest-fetch-mock";
import {initReactI18next} from "react-i18next";

import i18n from '../../oereb_client/static/src/i18n';

fetchMock.enableMocks();

i18n
  .use(initReactI18next)
  .init({
    ns: ['locale'],
    defaultNS: 'locale',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {},
      de: {}
    }
  });
