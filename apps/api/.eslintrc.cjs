/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@dnp'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'import/no-nodejs-modules': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@nestjs/**',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['@nestjs']
      }
    ]
  }
};
