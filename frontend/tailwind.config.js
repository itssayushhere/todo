/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayColor: "#222121",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none',  /* IE 10+ */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', /* Safari and Chrome */
        },
      });
    }
  ],
};
