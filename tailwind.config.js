/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(-90deg) scale(0)' },
          '100%': { transform: 'rotate(0) scale(1)' },
        },
      },
      animation: {
        rotate: 'rotate 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
