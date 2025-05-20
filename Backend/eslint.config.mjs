import pluginJs from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    files: ["**/*.js"],
    plugins: {
        jsdoc: jsdoc
    },
    rules: {
        "jsdoc/require-description": "error",
        "jsdoc/check-values": "error"
    }
},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: [".node_modules/*"]
},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended
];