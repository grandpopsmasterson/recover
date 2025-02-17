import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        recover: '#111127',
        recovernavy: '#15154e',
      },
      fontSize: {
        'fluid-small': 'var(--fluid-small)',
        'fluid-p1': 'var(--fluid-p1)',
        'fluid-h2': 'var(--fluid-h2)',
        'fluid-h1': 'var(--fluid-h1)',
        'fluid-header': 'var(--fluid-header)',
        'fluid-big-header': 'var(--fluid-big-header)',
      },
    },
  },
  plugins: [heroui()],
}