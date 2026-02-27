import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { storyblok } from "@storyblok/astro";
import favicons from "astro-favicons";

// Determine output mode based on IS_PREVIEW env variable
// Note: Vercel parses IS_PREVIEW=true as boolean, not string
const isPreview = process.env.IS_PREVIEW === true || process.env.IS_PREVIEW === 'true' || import.meta.env.IS_PREVIEW === true || import.meta.env.IS_PREVIEW === 'true';

// https://astro.build/config
export default defineConfig({
  // Use SSR (server) for preview mode, static for production
  output: isPreview ? "server" : "static",
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [storyblok({
    accessToken: import.meta.env.STORYBLOK_TOKEN || "your_token_here",
    components: {
      page: "components/storyblok/Page",
      hero: "components/storyblok/Hero",
      intro: "components/storyblok/Intro",
      projectPreview: "components/storyblok/ProjectPreview",
      detailedList: "components/storyblok/DetailedList",
      servicePreview: "components/storyblok/ServicePreview",
      testimonials: "components/storyblok/Testimonials",
      textImage: "components/storyblok/TextImage",
      gallery6: "components/storyblok/Gallery6"
    },
    enableFallbackComponent: true,
    customFallbackComponent: "components/storyblok/StoryblokFallback",
    bridge: true,
    apiOptions: {
      region: import.meta.env.STORYBLOK_REGION || "eu"
    }
  }), favicons(), sitemap()],
  site: import.meta.env.SITE_URL || "https://yourdomain.com"
})