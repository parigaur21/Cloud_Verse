/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#111111',
        border: '#333333',
        primary: {
          DEFAULT: '#0070f3',
          hover: '#0061d5',
        },
        accent: '#0070f3',
        success: '#0070f3',
        error: '#ee0000',
        warning: '#f5a623',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        'vercel': '5px',
      }
    },
  },
  plugins: [],
}