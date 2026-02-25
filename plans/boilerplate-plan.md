# Bastia Tattoo Astro Boilerplate Plan

## Overview

Create a simplified Astro boilerplate based on `../ia-astro` with:

- Astro + TypeScript
- Tailwind CSS with scaling system
- Storyblok CMS integration
- GSAP + Lenis for animations
- Vercel adapter
- Sitemap
- **Excluded**: Navigation drawer, menu button, loading component, custom cursor, grainy background, hero/text reveal components

## Project Structure

```
bastiatattoo/
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── astro.config.mjs
├── package.json
├── README.md
├── tailwind.config.mjs
├── tsconfig.json
├── vercel.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── BaseHead.astro
│   │   ├── Layout.astro
│   │   ├── Page.astro
│   │   ├── SkipLink.astro
│   │   └── StoryblokFallback.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   └── [...slug].astro
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── storyblok.ts
│   └── env.d.ts
└── plans/
    └── boilerplate-plan.md
```

## File Details

### Configuration Files

#### `package.json`

- **Dependencies**: astro, @astrojs/tailwind, @astrojs/vercel, @astrojs/sitemap, @storyblok/astro, @storyblok/richtext, gsap, lenis, tailwindcss
- **DevDependencies**: @types/node, prettier, prettier-plugin-astro, prettier-plugin-tailwindcss, typescript
- **Scripts**: dev, build, preview

#### `astro.config.mjs`

- Integrations: tailwind, sitemap, storyblok, vercel adapter
- Storyblok components: page, hero, textReveal (placeholders)
- Site URL from env

#### `tailwind.config.mjs`

- Standard config with content paths
- Empty theme extend (ready for customization)

#### `tsconfig.json`

- Standard Astro TypeScript config
- Strict mode enabled

### Source Files

#### `src/styles/global.css`

- Tailwind directives
- Outfit variable font face
- Base styles with scaling system
- Lenis recommended styles
- CSS custom properties for container sizing

#### `src/components/BaseHead.astro`

- SEO meta tags (title, description, og/twitter cards)
- Canonical URL
- JSON-LD structured data
- Customizable via props

#### `src/components/Layout.astro`

- Simplified layout (no cursor, no noise)
- BaseHead import
- SkipLink import
- Main content area
- Footer
- Lenis smooth scroll initialization
- GSAP ScrollTrigger setup

#### `src/components/SkipLink.astro`

- Accessibility skip link
- Hidden by default, visible on focus

#### `src/components/Page.astro`

- Storyblok page component
- Renders body content

#### `src/components/StoryblokFallback.astro`

- Fallback component when Storyblok component not found

#### `src/pages/[...slug].astro`

- Dynamic route for all pages
- Fetches content from Storyblok
- Renders Page component

#### `src/pages/404.astro`

- Custom 404 page

#### `src/utils/storyblok.ts`

- Storyblok API helper

### Public Assets

#### `public/favicon.svg`

- SVG favicon

#### `public/robots.txt`

- Basic robots.txt

### Environment

#### `.env.example`

- Environment variable template
- STORYBLOK_TOKEN, STORYBLOK_REGION, SITE_URL, SITE_NAME

#### `.gitignore`

- Standard gitignore for Node.js/Astro projects

## Implementation Order

1. Create configuration files (package.json, astro.config.mjs, tailwind.config.mjs, tsconfig.json)
2. Create environment files (.env.example, .gitignore)
3. Create public assets (favicon.svg, robots.txt)
4. Create TypeScript config (env.d.ts)
5. Create styles (global.css)
6. Create components (BaseHead, Layout, SkipLink)
7. Create Storyblok components (Page, StoryblokFallback)
8. Create pages (404, [...slug].astro)
9. Create utilities (storyblok.ts)
10. Create README.md

## Next Steps

Switch to Code mode to implement the boilerplate.
