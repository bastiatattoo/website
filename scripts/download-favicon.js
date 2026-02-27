/**
 * Script to download the favicon SVG from Storyblok before build
 * Run: node scripts/download-favicon.js
 * Or add to package.json: "build": "node scripts/download-favicon.js && astro build"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load .env file
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const STORYBLOK_TOKEN = process.env.STORYBLOK_TOKEN;
const GLOBAL_COMPONENT = 'global';
const FAVICON_FIELD = 'favicon';
const OUTPUT_PATH = path.join(__dirname, '../public/favicon.svg');

// Storyblok Content Delivery API URL
const STORYBLOK_API_URL = 'https://api.storyblok.com/v2/cdn/stories';

async function downloadFavicon() {
  if (!STORYBLOK_TOKEN) {
    console.error('❌ Error: STORYBLOK_TOKEN environment variable is not set');
    process.exit(1);
  }

  console.log('🔄 Fetching favicon from Storyblok...');

  try {
    // Fetch the global content from Storyblok
    const url = new URL(STORYBLOK_API_URL);
    url.searchParams.set('token', STORYBLOK_TOKEN);
    url.searchParams.set('version', 'draft');
    url.searchParams.set('by_slugs', 'global');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Storyblok API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.stories || data.stories.length === 0) {
      console.error('❌ Error: No "global" content found in Storyblok');
      process.exit(1);
    }

    const globalContent = data.stories[0];

    const faviconAsset = globalContent.content[FAVICON_FIELD];

    if (!faviconAsset) {
      console.error(`❌ Error: No "${FAVICON_FIELD}" field found in global content`);
      process.exit(1);
    }

    // Get the SVG URL from the asset
    const faviconUrl = faviconAsset.filename || faviconAsset;

    if (!faviconUrl) {
      console.error('❌ Error: No filename found in favicon asset');
      process.exit(1);
    }

    console.log(`📥 Downloading favicon from: ${faviconUrl}`);

    // Download the SVG content
    const faviconResponse = await fetch(faviconUrl);

    if (!faviconResponse.ok) {
      throw new Error(`Failed to download favicon: ${faviconResponse.status} ${faviconResponse.statusText}`);
    }

    const svgContent = await faviconResponse.text();

    // Validate it's actually SVG
    if (!svgContent.trim().startsWith('<svg')) {
      console.error('❌ Error: Downloaded file is not an SVG');
      process.exit(1);
    }

    // Write to public folder
    fs.writeFileSync(OUTPUT_PATH, svgContent, 'utf-8');

    console.log(`✅ Successfully downloaded favicon to ${OUTPUT_PATH}`);
    console.log(`   File size: ${Buffer.byteLength(svgContent, 'utf-8')} bytes`);

  } catch (error) {
    console.error('❌ Error downloading favicon:', error.message);
    process.exit(1);
  }
}

downloadFavicon();
