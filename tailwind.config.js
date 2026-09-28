/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4d5f9e',
        'primary-dark': '#2d3e6e',
        accent: '#2abfa2',
        'accent-light': '#85d4a6',
      },
    },
  },
  plugins: [],
};
