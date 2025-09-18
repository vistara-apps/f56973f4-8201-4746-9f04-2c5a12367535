import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 95%, 55%)',
        accent: 'hsl(32, 97%, 51%)',
        background: 'hsl(210, 36%, 96%)',
        surface: 'hsl(210, 36%, 100%)',
        text: 'hsl(210, 36%, 15%)',
        'dark-bg': 'hsl(220, 13%, 18%)',
        'dark-surface': 'hsl(220, 13%, 22%)',
        'dark-text': 'hsl(210, 36%, 85%)',
        'muted-foreground': 'hsl(210, 36%, 45%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 6px hsla(210, 36%, 15%, 0.05)',
        'modal': '0 12px 28px hsla(210, 36%, 15%, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.2, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
