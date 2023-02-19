/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      animation: {
        'full-pulse': 'full-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'color-pulse': 'color-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'full-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'color-pulse': {
          '0%, 100%': { backgroundColor: '#eff6ff' },
          '50%': { backgroundColor: '#dbeafe' },
        },
      },
    },
  },
  plugins: [],
}
