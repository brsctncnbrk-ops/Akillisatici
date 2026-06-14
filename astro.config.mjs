// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// NOT: `site` canonical URL ve sitemap için gerçek domain ile değiştirilmelidir.
// TBD - kullanıcıdan domain bilgisi bekleniyor.
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    // applyBaseStyles: false → temel stilleri src/styles/global.css üzerinden kontrol ederiz
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
});
