/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta suave e premium
        cream: '#FBF8F4', // fundo principal
        ink: '#3A3633', // texto escuro elegante
        muted: '#8A827B', // texto secundário
        line: '#ECE6DF', // bordas suaves
        // Apontamentos
        rose: {
          DEFAULT: '#C28591', // rosa queimado
          soft: '#F4E6E8',
        },
        lilac: {
          DEFAULT: '#A99BC4', // lilás suave
          soft: '#EEE9F4',
        },
        sage: {
          DEFAULT: '#9CAF96', // verde sálvia
          soft: '#E8EEE6',
        },
        gold: {
          DEFAULT: '#C9A86A', // dourado discreto
          soft: '#F5EDDD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(58, 54, 51, 0.04), 0 8px 24px rgba(58, 54, 51, 0.06)',
        card: '0 1px 3px rgba(58, 54, 51, 0.05), 0 12px 32px rgba(58, 54, 51, 0.05)',
      },
    },
  },
  plugins: [],
};
