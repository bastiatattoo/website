import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { storyblok } from "@storyblok/astro";
import favicons from "astro-favicons";
import { loadEnv } from "vite";

const env = loadEnv('', process.cwd(), '');
// Determine output mode based on IS_PREVIEW env variable
// Note: Vercel parses IS_PREVIEW=true as boolean, not string
const isPreview = env.IS_PREVIEW === true || process.env.IS_PREVIEW === true || process.env.IS_PREVIEW === 'true' || import.meta.env.IS_PREVIEW === true || import.meta.env.IS_PREVIEW === 'true';


// https://astro.build/config
export default defineConfig({
  // Use SSR (server) for preview mode, static for production
  output: isPreview ? "server" : "static",
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
    imagesConfig: {
      minimumCacheTTL: 86400,
      sizes: [300, 720, 1080, 1560, 1920, 2560],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "a.storyblok.com",
          pathname: `/f/${env.STORYBLOK_SPACE_ID}/**`,
        },
      ],
    },
  }),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['astro-leaflet > leaflet'],
    }
  },
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN || "your_token_here",
    components: {
      page: "components/storyblok/Page",
      hero: "components/storyblok/Hero",
      intro: "components/storyblok/BigText",
      projectPreview: "components/storyblok/ProjectPreview",
      detailedList: "components/storyblok/DetailedList",
      servicePreview: "components/storyblok/ServicePreview",
      testimonials: "components/storyblok/Testimonials",
      textImage: "components/storyblok/TextImage",
      gallery6: "components/storyblok/Gallery6",
      contact: "components/storyblok/Contact",
      filterGallery: "components/storyblok/FilterGallery",
      blog: "components/storyblok/Blog",
      button: "components/storyblok/Button",
      faq: "components/storyblok/Faq",
      maps: "components/storyblok/Maps",
      choices: "components/storyblok/Choices",
      nestedFaq: "components/storyblok/NestedFaq"
    },
    enableFallbackComponent: true,
    customFallbackComponent: "components/storyblok/StoryblokFallback",
    bridge: true,
    apiOptions: {
      region: env.STORYBLOK_REGION || "eu"
    },
  }), favicons(), sitemap()],
  image: {
      service: passthroughImageService(),
      remotePatterns: [
        {
          protocol: "https",
          hostname: "a.storyblok.com",
          pathname: `/f/${env.STORYBLOK_SPACE_ID}/**`,
        },
      ],
    },
  site: env.SITE_URL || "https://yourdomain.com"
})