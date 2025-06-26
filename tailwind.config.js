/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-han': ['Source Han Sans CN', 'sans-serif'],
        'microsoft-yahei': ['Microsoft YaHei', 'sans-serif'],
        'pingfang': ['PingFang SC', 'sans-serif'],
        'arial': ['Arial', 'sans-serif'],
        'helvetica': ['Helvetica', 'sans-serif'],
        'georgia': ['Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
} 