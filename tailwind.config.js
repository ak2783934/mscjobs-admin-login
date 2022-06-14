module.exports = {
  content: [
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Changa: ["Changa", "sans-serif"],
        Rochester: ["Rochester", "cursive"],
      },
    },
  },
  plugins: [],
};
