/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#cd3a3d',
          violet: '#222326',
          'orange-light': '#fead9a',
          gray: '#cccccc',
        },
      },
    },
  },
  plugins: [],
}
