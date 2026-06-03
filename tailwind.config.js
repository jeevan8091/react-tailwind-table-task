/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#4F46E5',
        slate: {
          900: '#1E293B',
        },
        background: '#F8FAFC',
      },
    },
  },
  plugins: [],
}
