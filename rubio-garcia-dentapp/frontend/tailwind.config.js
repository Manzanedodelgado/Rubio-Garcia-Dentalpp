/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#1E3A8A',
          700: '#005c7b',
          900: '#1E293B',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          400: '#ADB5BD',
          600: '#6C757D',
          800: '#343A40',
          900: '#212529',
        },
        accent: {
          50: '#FFF5EB',
          200: '#FFCAB0',
          400: '#FFB5A7',
          600: '#FF9068',
        },
        whatsapp: {
          yellow: '#FBBF24',
          blue: '#3B82F6',
          green: '#10B981',
          gray: '#9CA3AF',
        }
      },
      fontFamily: {
        display: ['Ubuntu', 'system-ui', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },
      borderRadius: {
        'sm': '4px',
        'base': '8px',
        'md': '12px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'base': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'accent': '0 4px 16px rgba(255, 181, 167, 0.25)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
