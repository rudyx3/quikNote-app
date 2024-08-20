module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // This should match all JS/TS files in your src directory
    "./public/index.html"          // Add this if you have an HTML file in public folder
  ],
  theme: {
    extend: {
      colors:{
        'custom-green': "#032D23",
        'custom-orange': "#D17B17",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'], // Default font
        'playfair': ['Playfair Display', 'serif'], // Custom font for specific elements
      },
    },
  },
  plugins: [],
}
