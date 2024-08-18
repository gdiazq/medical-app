/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'rm-blue-100': '#367CF4',
      'rm-blue-200': '#367CC8',
    },
    extend: {},
  },
  plugins: [],
}