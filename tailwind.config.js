/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4655",
        dark: "#0f1923",
        card: "#1f2731",
      },
    },
  },
  plugins: [],
};
