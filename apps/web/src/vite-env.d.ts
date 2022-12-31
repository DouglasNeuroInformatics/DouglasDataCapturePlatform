/// <reference types="vite/client" />

// All of these should be undefined in production
interface ImportMetaDevEnv {
  readonly VITE_DEV_USERNAME?: string;
  readonly VITE_DEV_PASSWORD?: string;
}

interface ImportMetaEnv extends ImportMetaDevEnv {
  readonly VITE_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
