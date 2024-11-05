/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        flash: "flash 0.5s ease-in-out",
      },
      keyframes: {
        flash: {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "rgba(255, 215, 0, 0.5)" }, // Gold flash
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0070f3",
          secondary: "#7928ca",
          accent: "#eaeaea",
          neutral: "#333333",
          "base-100": "#ffffff",
          info: "#2094f3",
          success: "#00c851",
          warning: "#ffbb33",
          error: "#ff4444",
        },
        dark: {
          primary: "#0d7377",
          secondary: "#32e0c4",
          accent: "#212121",
          neutral: "#1d1d1d",
          "base-100": "#1a1a1a",
          info: "#2094f3",
          success: "#21ba45",
          warning: "#fbbd08",
          error: "#ff6b6b",
        },
        bumblebee: {
          primary: "#ffc107",
          secondary: "#ffeb3b",
          accent: "#f5f5f5",
          neutral: "#333333",
          "base-100": "#ffffff",
          info: "#2094f3",
          success: "#00c851",
          warning: "#ffbb33",
          error: "#ff4444",
        },
        cupcake: {
          primary: "#ffafcc",
          secondary: "#ff8fa3",
          accent: "#ffe1e6",
          neutral: "#ffccde",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd08",
          error: "#ff4444",
        },
      },
    ],
  },
};
