import "@testing-library/jest-dom/vitest";

import {initReactI18next} from "react-i18next";
import ResizeObserver from "resize-observer-polyfill";
import {vi} from "vitest";
import createFetchMock from "vitest-fetch-mock";

import i18n from "../../oereb_client/static/src/i18n";

const fetchMock = createFetchMock(vi);

fetchMock.enableMocks();

i18n
  .use(initReactI18next)
  .init({
    ns: ["locale"],
    defaultNS: "locale",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {},
      de: {}
    }
  });

global.ResizeObserver = ResizeObserver
