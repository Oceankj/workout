const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#8abdff',
        primary: '#6d5dfc',
        'primary-dark': '#5b0eeb',
        white: '#ffffff',
        'grey-light-1': '#e4ebf5',
        'grey-light-2': '#c8d0e7',
        'grey-light-3': '#bec8e4',
        'grey-dark': '#9baacf',
      },
      boxShadow: {
        custom: '0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #ffffff',
        'inner-custom':
          'inset 0.2rem 0.2rem 0.5rem #c8d0e7, inset -0.2rem -0.2rem 0.5rem #ffffff',
      },
      keyframes: {
        loaderWaves: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        loaderWaves: 'loaderWaves 2s linear infinite',
        loaderWavesDelay: 'loaderWaves 2s linear 1s infinite',
      },
    },
  },
  plugins: [],
};
