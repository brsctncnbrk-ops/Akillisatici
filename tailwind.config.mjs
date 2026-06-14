/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Marka rengi TBD - kullanıcıdan bekleniyor. Şimdilik nötr palet.
      colors: {
        brand: {
          DEFAULT: '#1f2937',
          accent: '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
