/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,js,ts}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#14b8a6', light: '#2dd4bf', dark: '#0d9488' },
        accent: { DEFAULT: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' }
      },
      boxShadow: {
        elevated: '0 10px 30px rgba(0,0,0,.35)',
        glow: '0 0 20px rgba(20, 184, 166, 0.3)',
        'glow-accent': '0 0 20px rgba(139, 92, 246, 0.25)'
      },
      borderRadius: {
        xl: '14px',
        lg: '12px'
      }
    }
  },
  plugins: []
}
