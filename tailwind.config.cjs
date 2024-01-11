module.exports = {
  content: ['./views/**/*.pug'],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1330px'
    },
    extend: {
      colors: {
        primary: '#242a2b',
        secondary: '#808080',
        tertiary: '#eaeaea',
        accent: {
          DEFAULT: '#312e81',
          secondary: '#1e1b4b',
          tertiary: '#6366f1'
        },
        grey: '#e8f0f1',
        hover: '#dc2626'
      },
      fontFamily: {
        primary: 'Poppins'
      },
      boxShadow: {
        custom1: '0px 2px 40px 0px rgba(8, 70, 78, 0.08)',
        custom2: '0px 0px 30px 0px rgba(8, 73, 81, 0.06)'
      },
    },
  },
  plugins: [],
}

