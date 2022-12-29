/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@dnp'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  }
};
