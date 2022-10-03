/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    //*change these color
    colors: {
      //!default purple
      //background
      primary: '#19012A',
      //background buttons/cards
      secondary: '#4D3A64',
      //border buttons/details buttons
      terciary: '#E93A88',
      //main font and some borders
      fontColor: '#ffffff',

      //titles font on details page
      gray: colors.gray,
      red: colors.red,
      transparent: 'transparent',

      //!Dark themed:
      //*comment out the above variables and uncomment these ones for a dark theme
      // //main background
      // primary: '#121212',
      // //background buttons/cards
      // secondary: '#000000',
      // //border buttons/details buttons
      // terciary: '#BB86FC',

      //!Light themed:
      //*comment out the above varaibles and uncomment these ones for a light theme
      // //main background
      // primary: 'ffffff',
      // //background buttons/cards
      // secondary: '#BB86FC', //accent color of your choice
      // //border buttons/details buttons
      // terciary: '#121212',
      // //main font **be sure to change this to a dark color!!
      // fontColor: '000000'
    }
  },
  plugins: []
}
