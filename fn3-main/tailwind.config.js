/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fn3-red':        '#b91c1c',
        'fn3-red-light':  '#f87171',
        'fn3-red-faint':  '#fde8e8',
        'fn3-warm-white': '#fffbfb',
        'fn3-near-black': '#0c0a0a',
        'fn3-dark-border':'#1a1212',
        'fn3-dark-label': '#2a1a1a',
        'fn3-dark-text':  '#3f3232',
        'fn3-body':       '#1c1917',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
