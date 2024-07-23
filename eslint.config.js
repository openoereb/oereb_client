import js from "@eslint/js";
import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import vitest from "eslint-plugin-vitest";
import vitestGlobals from "eslint-plugin-vitest-globals";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  js.configs.recommended,
  reactRecommended,
  {
    files: [
      "oereb_client/**/*.{js,jsx,mjs,cjs,ts,tsx}",
      "test/**/*.{js,jsx,mjs,cjs,ts,tsx}"
    ],
    ignores: [
      "test/js/**/assets/**/*.js",
      "node_modules/**/*.{js,jsx,mjs,cjs,ts,tsx}",
    ],
    plugins: {
      vitest: vitest,
      vitestGlobals,
      "simple-import-sort": simpleImportSort
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
        ...vitestGlobals.environments.env.globals,
        proj4: "readonly",
        "__dirname": "readonly",
        global: "readonly"
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "max-len": ["error", {code: 110}]
    }
  }
];
