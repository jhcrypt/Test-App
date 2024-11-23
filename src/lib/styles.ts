import { ColorScheme } from './types';

export const getColorPalette = (scheme: ColorScheme) => {
  switch (scheme) {
    case 'purple-orange':
      return {
        left: {
          primary: 'purple-500',
          secondary: 'purple-400',
          tertiary: 'purple-300',
          bg: 'purple-500/10',
          border: 'purple-500/30',
        },
        right: {
          primary: 'orange-500',
          secondary: 'orange-400',
          tertiary: 'orange-300',
          bg: 'orange-500/10',
          border: 'orange-500/30',
        },
      };
    case 'gray':
      return {
        left: {
          primary: 'gray-500',
          secondary: 'gray-400',
          tertiary: 'gray-300',
          bg: 'gray-500/10',
          border: 'gray-500/30',
        },
        right: {
          primary: 'gray-600',
          secondary: 'gray-500',
          tertiary: 'gray-400',
          bg: 'gray-600/10',
          border: 'gray-600/30',
        },
      };
    default: // blue-green
      return {
        left: {
          primary: 'blue-500',
          secondary: 'blue-400',
          tertiary: 'blue-300',
          bg: 'blue-500/10',
          border: 'blue-500/30',
        },
        right: {
          primary: 'green-500',
          secondary: 'green-400',
          tertiary: 'green-300',
          bg: 'green-500/10',
          border: 'green-500/30',
        },
      };
  }
};

export const getFontSizeClasses = (
  size: 'small' | 'medium' | 'large',
  type: 'title' | 'description' | 'aspect-title' | 'aspect-text'
) => {
  const sizes = {
    small: {
      title: 'text-lg',
      description: 'text-xs',
      'aspect-title': 'text-sm',
      'aspect-text': 'text-xs',
    },
    medium: {
      title: 'text-xl',
      description: 'text-sm',
      'aspect-title': 'text-base',
      'aspect-text': 'text-sm',
    },
    large: {
      title: 'text-2xl',
      description: 'text-base',
      'aspect-title': 'text-lg',
      'aspect-text': 'text-base',
    },
  };

  return sizes[size][type];
};

export const animations = {
  scaleOnHover: 'transform hover:scale-105 transition-transform duration-200',
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  pulse: 'animate-pulse',
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

export const borders = {
  thin: 'border',
  medium: 'border-2',
  thick: 'border-4',
  rounded: 'rounded-lg',
  circle: 'rounded-full',
};

export const spacing = {
  section: 'space-y-8',
  element: 'space-y-4',
  tight: 'space-y-2',
  loose: 'space-y-12',
};

export const layout = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  grid: {
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    cols3: 'grid grid-cols-1 md:grid-cols-3 gap-8',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
  },
};
