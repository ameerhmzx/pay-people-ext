const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./entrypoints/popup/index.html",
    "./entrypoints/popup/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        time: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};
