import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        button: "#006FEE",
        customGray: '#A7A7A7',
        hero: "f1f0f0",
        achterground:"#e7e5e5",
        headerground : "#eae7e7",
        buttonsh : "#d1e5fc",
        pcolor: "#A4A4A4",
        
      },
    },
  },
  plugins: [],
};
export default config;
