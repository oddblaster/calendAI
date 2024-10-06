/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        'gradient-animated': 'linear-gradient(270deg, #ff7e5f, #feb47b, #6a82fb, #fc5c7d)',
        'text-gradient-animated': 'linear-gradient(270deg, #FFA17F, #FFFFFF)'
      },
      animation: {
        'gradient': 'gradient-animation 10s cubic-bezier(0.42, 0, 0.58, 1) infinite',
        'gradient-text':'text-gradient-animation 10s cubic-bezier(0.42, 0, 0.58, 1) infinite' 
      },
      keyframes: {
        'gradient-animation': {
          '0%': { 'background-position': '0% 50%' },
          '15%': { 'background-position': '25% 75%' },
          '30%': { 'background-position': '50% 25%' },
          '45%': { 'background-position': '75% 50%' },
          '60%': { 'background-position': '100% 75%' },
          '75%': { 'background-position': '50% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}