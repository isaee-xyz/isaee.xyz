/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#FFDE00',
        'neo-pink': '#FF90E8',
        'neo-blue': '#3333FF',
        'neo-green': '#23FF23',
        'neo-orange': '#FF6B00',
      },
      fontFamily: {
        sans: ['"Lexend Mega"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        neo: '5px 5px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '10px 10px 0px 0px rgba(0,0,0,1)',
        'neo-xl': '15px 15px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}
