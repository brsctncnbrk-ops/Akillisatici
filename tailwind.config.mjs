/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Birincil vurgu: turuncu (marka)
        brand: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
          light: '#fb923c',
        },
        // Koyu nötr (başlıklar + koyu bölümler)
        ink: {
          DEFAULT: '#0f172a',
          soft: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12)',
        // Marka turuncusu parıltısı — birincil CTA için
        glow: '0 10px 30px -8px rgb(249 115 22 / 0.45)',
      },
      keyframes: {
        // Dekoratif arka plan kürelerinin yavaş süzülmesi
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-18px) translateX(10px)' },
        },
        // Hero içeriğinin yumuşak girişi
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'float-slow': 'float 13s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
