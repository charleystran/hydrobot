module.exports = {
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'bright-blue': '#347BB6',
        'bright-orange': '#FFA600',
        'bright-purple': '#B6349B',
        'bright-green': '#34B64F',
        'bright-red': '#B63434',
        'smoke-darkest': 'rgba(0, 0, 0, 0.9)',
        'smoke-darker': 'rgba(0, 0, 0, 0.75)',
        'smoke-dark': 'rgba(0, 0, 0, 0.6)',
        'smoke': 'rgba(0, 0, 0, 0.5)',
        'smoke-light': 'rgba(0, 0, 0, 0.4)',
        'smoke-lighter': 'rgba(0, 0, 0, 0.25)',
        'smoke-lightest': 'rgba(0, 0, 0, 0.1)',
        'primary-red': '#97293E',
        'primary-blue': '#24588E'
      }
    },
    inset: {
      '-2': '-0.75rem',
      '1/3': '33%',
      '1/2': '50%'
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography')
  ]
}

