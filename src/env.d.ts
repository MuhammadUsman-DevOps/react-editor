/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PIXABAY_KEY: string
  readonly VITE_APP_PEXELS_KEY: string
  readonly VITE_RADIANCE_BACKEND_URL: string
  readonly VITE_SUPABASE_BACKEND_URL: string
  readonly VITE_BUCKET: string
  readonly VITE_AWS_ACCESS_KEY_ID: string
  readonly VITE_AWS_SECRET_ACCESS_KEY: string
  readonly VITE_REGION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
