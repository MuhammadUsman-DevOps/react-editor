/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PIXABAY_KEY: string
  readonly VITE_APP_PEXELS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
