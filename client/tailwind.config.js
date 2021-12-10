const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      "navy": "#2E4C6D",
      "blue" :"#396EB0",
      "orange": "#FC997C",
      "vintage": "#DADDFC",
      "green":"#74D61D",
      "teal": "#71DFE7",
      "cold" :"#009DAE",
      "yellow": "#FFE652",
      "black-opacity": "rgb(0,0,0, 0.50)"
    },
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'body': ['Nunito']
      },
      spacing: {
        '97': '26rem',
        '98': '27rem',
        '544': '34rem'
      },
      gridTemplateColumns: {
        '002': '0.5fr 1.5fr',
        '02': '1.5fr 2fr'
      },
       borderRadius:{
          '5xl': '3000px',
          '5lg': '50px'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}