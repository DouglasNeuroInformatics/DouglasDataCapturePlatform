/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@dnp/eslint-config/nextjs'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  settings: {
    next: {
      rootDir: __dirname
    }
  }
};
