import path from 'path';
import url from 'url';

import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

// Replicate the functionality of __dirname in ES module
const rootDir = path.dirname(url.fileURLToPath(import.meta.url));

// GENERIC CONFIGS

const baseConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['.git/**', '**/node_modules/**', '**/dist/**'],
  languageOptions: {
    globals: {
      ...globals.es2021
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      //tsconfigRootDir: rootDir,
      project: [path.resolve(rootDir, 'tsconfig.eslint.json')],
      sourceType: 'module'
    }
  }, 
  plugins: {
    '@typescript-eslint': tsPlugin,
    import: importPlugin
  },
  rules: {
    ...tsPlugin.configs['recommended'].rules,
    ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
    'import/exports-last': 'error',
    'import/newline-after-import': 'error',
    'import/no-nodejs-modules': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ]
  },
  settings: {
    'import/extensions': ['.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: true
    }
  }
};

const jsxConfig = {
  files: ['**/*.tsx'],
  languageOptions: {
    globals: {
      ...globals.browser
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    react: reactPlugin
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
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
    'react/button-has-type': 'error',
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

// PROJECT-SPECIFIC CONFIGS

const apiConfig = {
  files: ['apps/api/**/*.ts'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
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

const webConfig = { ...jsxConfig, files: ['apps/web/**/*.ts', 'apps/web/**/*.tsx'] };

// CONFIG CASCADE

export default ['eslint:recommended', prettierConfig, baseConfig, jsxConfig, apiConfig, webConfig];
