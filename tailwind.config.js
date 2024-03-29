export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    daisy: "#FFEF60",
    shark: "#1A1B1F",
    midnight: "#06060B",
    foam: "#F4F6FF",
  },
  container: {
    center: true,
    padding: "0.5rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "1rem",
    "2xl": "2rem",
    full: "9999px",
  },
  extend: {
    fontSize: {
      "3xl": ["1.75rem", "2rem"],
      "5xl": ["3.5rem", "4rem"],
      "6xl": ["64px", "80px"],
      "7xl": ["72px", "96px"],
      "8xl": ["96px", "128px"],
    },
    fontFamily: {
      vollkorn: ["Vollkorn", "serif"],
      muli: ["Muli", "sans-serif"],
      monomaniac: ['"Monomaniac One"', "mono"],
    },
    dropShadow: {
      glow: [
        "0 0px 20px rgba(0, 255, 26, .5)",
        "0 0px 65px rgba(0, 255, 26, .3)",
      ],
    },
  },
};
export const plugins = [require("@tailwindcss/typography")];
