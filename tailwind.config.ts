import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      blur: {
        'xxs': '1px',
        '4xl': '90px'
      },
      fontSize: {
        '9xl': ['256px', '256px'],
      },
      keyframes: {
        rainbow: {
          // '0%, 100%': { opacity: '0.4' }, // useful for large text
          '0%': { color: 'red' },
          '15%': { color: 'orange' },
          '30%': { color: '#BA8E23' },
          '45%': { color: 'green' },
          '60%': { color: 'blue' },
          '75%': { color: 'indigo' },
          '90%': { color: 'violet' },
          '100%': { color: 'red' },
        },
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        cuspulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        rainbow: 'rainbow 4s ease-in-out infinite',
        wiggle: 'wiggle 12s ease-in-out infinite',
        cuspulse: 'cuspulse 2s ease-in-out 5',
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
}
export default config