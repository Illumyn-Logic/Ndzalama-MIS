import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Ndzalama Training
        brand: {
          primary: '#1B3B1B',      // Deep Forest Green
          'primary-light': '#2D5D2D',
          'primary-dark': '#0F1F0F',
          secondary: '#7BC62D',    // Vibrant Leaf Green
          'secondary-light': '#9DD857',
          'secondary-dark': '#5FA020',
          neutral: '#E8F0E8',      // Pale Sage
          'neutral-light': '#F5F9F5',
          'neutral-dark': '#D0E0D0',
        },
        // Semantic Colors
        text: {
          primary: '#222222',
          secondary: '#4A4F57',
          muted: '#666666',
          light: '#9CA3AF',
        },
        // Assessment Digital Pen Colors
        assessment: {
          learner: '#000000',       // Black
          assessor: '#FF0000',      // Red
          'assessor-alt': '#FF6600', // Orange
          moderator: '#008000',     // Green
          'external-mod': '#800080', // Purple
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          '"Geist Mono"',
          'ui-monospace',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
