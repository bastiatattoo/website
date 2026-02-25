/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly STORYBLOK_TOKEN: string
  readonly STORYBLOK_SPACE_ID: string
  readonly STORYBLOK_REGION: string
  readonly SITE_URL: string
  readonly SITE_NAME: string
  readonly IS_PREVIEW: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    lenis: any
  }
}

export {}
