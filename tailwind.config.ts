import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New "Living Garden" palette
        sakura: {
          DEFAULT: '#FF6B9D',
          light: '#FFB3CC',
          dark: '#E84577',
          50: '#FFF0F5',
        },
        spring: {
          DEFAULT: '#2EC4B6',
          light: '#7EDDD3',
          dark: '#1A9E91',
        },
        sunshine: {
          DEFAULT: '#FFD93D',
          light: '#FFED94',
          dark: '#E5B800',
        },
        sky: {
          DEFAULT: '#6CB4EE',
          light: '#A8D8F0',
          dark: '#3A8FD4',
        },
        lavender: {
          DEFAULT: '#A78BFA',
          light: '#C4B5FD',
          dark: '#7C5BF0',
        },
        snow: '#FAFBFF',
        cream: '#FFF5E4',
        charcoal: {
          DEFAULT: '#2D3436',
          light: '#636E72',
          lighter: '#B2BEC3',
        },
        // Keep old palette temporarily for migration
        rose: { DEFAULT: '#E8A0A8', deep: '#C4596A', light: '#F5D0D4' },
        ivory: { DEFAULT: '#FAF6EF', warm: '#F3EBD8' },
        midnight: { DEFAULT: '#1A1523', soft: '#2D2440', lighter: '#3D3254' },
        gold: { DEFAULT: '#D4A847', soft: '#EDD89A', glow: '#F5E6B0' },
        mist: '#8A7E96',
        // Night garden CTA section
        nightsky: {
          DEFAULT: '#0F1B3D',
          light: '#1A2B5C',
        },
      },
      fontFamily: {
        'display-zh': ['var(--font-noto-serif-sc)', 'serif'],
        'display-en': ['var(--font-cormorant)', 'serif'],
        'body-zh': ['var(--font-noto-sans-sc)', 'sans-serif'],
        'body-en': ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'hero-sky':
          'linear-gradient(180deg, #6CB4EE 0%, #A8D8F0 25%, #C4B5FD 50%, #FFB3CC 75%, #FFF5E4 100%)',
        'night-sky':
          'linear-gradient(180deg, #0F1B3D 0%, #1A2B5C 40%, #2D2440 100%)',
      },
      animation: {
        'petal-float': 'petal-float 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'petal-spin': 'petal-spin 6s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'petal-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
          '33%': { transform: 'translateY(-20px) rotate(8deg)', opacity: '1' },
          '66%': { transform: 'translateY(-10px) rotate(-5deg)', opacity: '0.8' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'petal-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
