/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@dnp/eslint-config/react'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
};