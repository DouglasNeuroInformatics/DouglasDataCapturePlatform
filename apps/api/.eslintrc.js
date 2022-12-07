/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@dnp/eslint-config/nestjs'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  }
};
