/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyan: {
          neon: '#00FFE7',
          dim: '#00BFA8',
        },
        yellow: {
          neon: '#FFE600',
          dim: '#C9B500',
        },
        lab: {
          black: '#080808',
          dark: '#111111',
          card: '#141414',
          border: '#222222',
          muted: '#444444',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.2s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 231, 0.4), 0 0 40px rgba(0, 255, 231, 0.15)',
        'neon-yellow': '0 0 20px rgba(255, 230, 0, 0.4), 0 0 40px rgba(255, 230, 0, 0.15)',
        'neon-cyan-sm': '0 0 8px rgba(0, 255, 231, 0.5)',
        'card-hover': '4px 4px 0px #00FFE7',
      },
    },
  },
  plugins: [],
};
