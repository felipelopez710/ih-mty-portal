/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'ih-blue': '#003A78',
        'ih-overlay-blue': '#295A8E',
        'light-white': '#CCD8E4',
        'neutral-20': '#D2D2D2',
        'ih-background': '#F8FAFC',
        'light-blue': '#E0E7EF',
        'light-background': '#F0F0F1',
        'rainbow-red': '#E63312',
        'rainbow-pink': '#BA2C70',
        'rainbow-magenta': '#650549',
        'rainbow-blue': '#27348B',
        'rainbow-green': '#007D58',
        'rainbow-lime': '#95C11F',
        'rainbow-orange': '#F18700',
        'rainbow-yellow': '#FBBA00',
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        'login-card': '0px 0px 4px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.04)',
        'card': '0px 2px 8px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
};
