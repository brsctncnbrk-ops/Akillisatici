// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` canonical URL ve sitemap için kullanılır.
export default defineConfig({
  site: 'https://saticikutusu.com',
  integrations: [
    // applyBaseStyles: false → temel stilleri src/styles/global.css üzerinden kontrol ederiz
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
});
