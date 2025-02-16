import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // safelist: [
  //   {
  //     pattern: /(text|bg|border)-(purple|gray)-\d+$|hover:(text|bg|border)-(purple)-\d+$|rounded(-\w+)?$|(mx|my)-\d+$|(p|px|py|pt|pb|pl|pr)-\d+$|-?(m|mx|my|mt|mb|ml|mr)-\d+$|transition(-\w+)?$|duration-\d+$|ease-\w+(-\w+)?$/, 
  //   }
  // ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        recovernavy: '#15154e',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
