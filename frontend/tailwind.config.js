/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customText: '#D8E4FD',
        customBlue: '#2070F4'
      },
    },
  },
  plugins: [],
}
