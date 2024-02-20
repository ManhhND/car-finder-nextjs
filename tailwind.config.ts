import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '5/2': '5 / 2',
        '2/1': '2 / 1',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'gray': '#F6F7F9',
        'gray-2': 'rgba(19, 19, 19, 0.6)',
        'gray-3': 'rgba(19, 19, 19, 0.16)',
        'gray-4': '#787878',
        'gray-5': '#90A3BF',
        'black': '#1A202C',
        'blue': '#3563E9',
      },
      screens: {
        'xs': '320px',
        // => @media (min-width: 320px) { ... }
        'tablet': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
        'mobile': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
        'mobile-sm': {'max': '640px'},
        // => @media (max-width: 640px) { ... }
      }
    },
  },
  plugins: [],
};
export default config;
