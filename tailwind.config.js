/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Colors
    'text-blue-300',
    'text-blue-400',
    'text-blue-500',
    'text-green-300',
    'text-green-400',
    'text-green-500',
    'text-purple-300',
    'text-purple-400',
    'text-purple-500',
    'text-orange-300',
    'text-orange-400',
    'text-orange-500',
    // Gradients
    'from-blue-500',
    'to-purple-500',
    'from-blue-500/10',
    'to-green-500/10',
    'border-blue-500/20',
    'border-green-500/20',
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'bg-gradient-radial',
    // Animations
    'animate-fade-in',
    'animate-scale-in',
    'animate-slide-in',
    'animate-rotate-in',
    'animate-pulse',
    'animate-bounce',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1A1A1A',
        'background-secondary': '#242424',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'rotate-in': 'rotateIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-10deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
