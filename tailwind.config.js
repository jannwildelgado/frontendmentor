/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  darkMode: 'class',

  content: [
    './components/**/*.{vue,js,jsx,ts,tsx}',
    './pages/**/*.{vue,js,jsx,ts,tsx}',
    './node_modules/flowbite.{js,ts}',
    './app.vue'
  ],

  theme: {
    extend: {
      sans: ['Rubik', ...defaultTheme.fontFamily.sans],

      colors: {
        primary: '#5457b6'
      }
    }
  },

  prefix: '',

  plugins: [
    require('flowbite')
  ]
}
