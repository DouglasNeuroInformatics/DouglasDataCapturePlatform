// import the original type declarations
import 'i18next';

// import all namespaces (for the default language, only)
import common from './public/locales/en/common.json';
import errors from './public/locales/en/errors.json';
import login from './public/locales/en/login.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      errors: typeof errors;
      login: typeof login;
    };
  }
}
