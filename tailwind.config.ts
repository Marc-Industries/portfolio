import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep red / black cinematic palette
        space: {
          50:  '#F2D9D9',
          100: '#E2AFAF',
          200: '#C58080',
          300: '#9C5050',
          400: '#7A2E2E',
          500: '#5A1A1A',
          600: '#3F0F0F',
          700: '#260808',
          800: '#160404',
          900: '#0A0202',
          950: '#050000',
        },
        // Accents
        accent: {
          crimson: '#D43F3F', // primary signal
          blood:   '#8B0F0F', // deep
          fire:    '#FF5C3A', // hot
          amber:   '#F2B441', // warning
          ember:   '#FF8A5C', // mid
          ash:     '#3A2828', // muted
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        widest2: '0.28em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 60s linear infinite',
        'spin-reverse': 'spin 80s linear infinite reverse',
        'ticker':     'ticker 30s linear infinite',
        'orbit':      'orbit 40s linear infinite',
        'grid-pan':   'grid-pan 20s linear infinite',
        'glitch':     'glitch 2.5s steps(1) infinite',
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'flicker':    'flicker 3.5s linear infinite',
        'scan':       'scan 6s linear infinite',
        'drift':      'drift 30s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(var(--r, 200px)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--r, 200px)) rotate(-360deg)' },
        },
        'grid-pan': {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        glitch: {
          '0%, 100%':  { transform: 'translate(0,0)', filter: 'none' },
          '20%':       { transform: 'translate(-1px,1px)' },
          '40%':       { transform: 'translate(1px,-1px)' },
          '60%':       { transform: 'translate(-1px,-1px)' },
          '80%':       { transform: 'translate(1px,1px)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.4' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%':      { transform: 'translate(20px, -20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
