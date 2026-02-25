# Bastia Tattoo - Astro Boilerplate

A modern Astro boilerplate with Tailwind CSS, Storyblok CMS, GSAP animations, and Lenis smooth scrolling.

## Features

- **Astro 5.x** - Modern static site generator
- **Tailwind CSS** - Utility-first CSS framework with custom scaling system
- **Storyblok** - Headless CMS integration
- **GSAP** - Professional-grade animations
- **Lenis** - Smooth scrolling
- **Vercel** - Deployment ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your Storyblok token:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `STORYBLOK_TOKEN` | Your Storyblok API token |
| `STORYBLOK_REGION` | Storyblok region (`eu` or `us`) |
| `SITE_URL` | Your site URL |
| `SITE_NAME` | Your site name |
| `IS_PREVIEW` | Set to `true` for Storyblok visual editor |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run dev:preview` - Preview with SSR for Storyblok

## Project Structure

```
src/
├── components/
│   ├── BaseHead.astro    # SEO metadata
│   ├── Layout.astro       # Main layout
│   ├── Page.astro         # Storyblok page component
│   ├── SkipLink.astro     # Accessibility skip link
│   └── StoryblokFallback.astro
├── pages/
│   ├── [...slug].astro    # Dynamic routes
│   └── 404.astro          # Not found page
├── styles/
│   └── global.css         # Global styles + Tailwind
└── utils/
    └── storyblok.ts       # Storyblok helpers
```

## Customization

### Scaling System

The boilerplate uses a responsive scaling system based on container width. Customize in `src/styles/global.css`.

### Fonts

The Outfit variable font is included. Replace with your own in `public/fonts/` and update `global.css`.

## Deployment

Deploy to Vercel with zero configuration:

```bash
npm run build
```

Or connect your repository to Vercel for automatic deployments.
