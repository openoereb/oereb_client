const reactRecommended = require('eslint-plugin-react/configs/recommended');
const vitest = require('eslint-plugin-vitest');
const vitestGlobalsRecommended = require('eslint-plugin-vitest-globals/configs/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require('globals');

export default [
  "eslint:recommended",
  ...reactRecommended,
  ...vitestGlobalsRecommended,
  {
    files: [
      "oereb_client/**/*.js",
      "test/**/*.js"
    ],
    ignores: [
      "test/js/**/assets/**/*.js"
    ],
    env: {
      browser: true,
      es6: true
    },
    plugins: {
      vitest,
      vitestGlobals,
      simpleImportSort
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
        ...vitestGlobalsRecommended.environments.env.globals,
        proj4: "readonly",
        "__dirname": "readonly"
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...vitest.configs.recommended.rules
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "max-len": ["error", {code: 110}]
    }
  }
];
