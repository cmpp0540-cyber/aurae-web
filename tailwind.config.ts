import type { Config } from 'tailwindcss';

/**
 * Aurae design tokens.
 * Mirrors the brand palette from the original homepage prototype so the
 * React build is visually identical to the approved design.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF6F91',
        'coral-soft': '#FFA9A3',
        sun: '#FFD66B',
        blush: '#FFE5D9',
        ivory: '#FFF8F0',
        espresso: '#3A2E2A',
        cream: '#FFFCF8',
        // per-product accents (used for gradients + chips)
        'acc-calm': '#D4A5D4',
        'acc-calm-soft': '#E8D5F0',
        'acc-sleep': '#A8D8F0',
        'acc-sleep-soft': '#D5E8F2',
        'acc-radiance': '#FFB366',
        'acc-renewal': '#B8D4C8',
        'acc-renewal-soft': '#D5E8DD',
      },
      fontFamily: {
        // `--font-display` is swappable in app/globals.css (Fraunces ⇄ Playfair Display)
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 5.75rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.2em' }],
      },
      maxWidth: {
        shell: '1400px',
        prose2: '640px',
      },
      boxShadow: {
        card: '0 20px 50px rgba(255,111,145,0.15)',
        bottle: '0 35px 80px rgba(255,111,145,0.35), 0 10px 30px rgba(58,46,42,0.12)',
        soft: '0 12px 40px rgba(255,111,145,0.08)',
        drawer: '-24px 0 60px rgba(58,46,42,0.18)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.15)' },
        },
        // Sweeps a soft highlight across a loading placeholder.
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        // Barely-there drift for the hero product labels.
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        twinkle: 'twinkle 4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 5.5s ease-in-out infinite',
      },
      transitionTimingFunction: {
        aurae: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
