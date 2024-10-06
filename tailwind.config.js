/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
          'primary': '#7480ff',
          'secondary': '#ff62d4',
          'accent': '#01cab6',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
