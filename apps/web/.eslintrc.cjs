/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@dnp'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react'],
  rules: {
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
            pattern: 'react',
            position: 'before'
          },
          {
            group: 'external',
            pattern: '{next,next/**}',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react']
      }
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true
      }
    ]
  },
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    react: {
      version: 'detect'
    }
  }
};
