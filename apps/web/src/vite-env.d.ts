/// <reference types="vite/client" />

// All of these should be undefined in production
interface ImportMetaDevEnv {
  readonly VITE_ADMIN_USERNAME?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
}

interface ImportMetaEnv extends ImportMetaDevEnv {
  readonly VITE_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
