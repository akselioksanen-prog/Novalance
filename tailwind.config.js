import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#090a0f', panel: '#11131c', cyan: '#60e6ff', lilac: '#9b8cff' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], display: ['Space Grotesk', 'Inter', 'sans-serif'] },
      boxShadow: { glow: '0 0 80px rgba(96,230,255,.18)' },
      keyframes: { float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } } },
      animation: { float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [animate],
}
