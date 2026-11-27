/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,js,ts}'],
  theme: {
    extend: {
      fontFamily: { sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Noto Sans"', 'Ubuntu', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#79e4d6', light: '#79e4d6', dark: '#176b65' },
        ink: { DEFAULT: '#0b1016', surface: '#111921', line: '#27323e', text: '#f1f4f5', muted: '#a1adb9', paper: '#f3f5f3', dark: '#101922', mint: '#e6f2ed' },
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
