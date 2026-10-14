import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#080a12', panel: '#111522', line: 'rgba(255,255,255,.1)', mist: '#a6aec5', violet: '#8b5cf6', cyan: '#42d9df' },
      fontFamily: { display: ['"Space Grotesk"', 'sans-serif'], sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
