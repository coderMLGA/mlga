import pluginJs from "@eslint/js";
import js from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import solid from "eslint-plugin-solid/configs/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  solid,
  eslintConfigPrettier,
  js.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "solid/jsx-uses-vars": "off", // Отключаем правило solid/jsx-uses-vars
    },
  },
];
