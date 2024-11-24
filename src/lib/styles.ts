/**
 * @file: styles.ts
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
type FontSizeType = 'small' | 'medium' | 'large';
type TextType = 'title' | 'description' | 'aspect-title' | 'aspect-text';

const fontSizes: Record<FontSizeType, Record<TextType, string>> = {
  small: {
    title: 'text-lg',
    description: 'text-sm',
    'aspect-title': 'text-sm',
    'aspect-text': 'text-xs',
  },
  medium: {
    title: 'text-xl',
    description: 'text-base',
    'aspect-title': 'text-base',
    'aspect-text': 'text-sm',
  },
  large: {
    title: 'text-2xl',
    description: 'text-lg',
    'aspect-title': 'text-lg',
    'aspect-text': 'text-base',
  },
};

export const getFontSizeClasses = (size: FontSizeType, type: TextType): string => {
  return fontSizes[size][type];
};

export const animations = {
  scaleOnHover: 'hover:scale-105 transition-transform duration-200',
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  slideIn: 'animate-slide-in',
  rotateIn: 'animate-rotate-in',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  inner: 'shadow-inner',
  none: 'shadow-none',
};

export const borders = {
  rounded: 'rounded-xl',
  circle: 'rounded-full',
  none: 'rounded-none',
};

export const gradients = {
  primary: 'bg-gradient-to-r from-blue-500 to-purple-500',
  secondary: 'bg-gradient-to-r from-green-500 to-blue-500',
  accent: 'bg-gradient-to-r from-purple-500 to-pink-500',
  radial: 'bg-gradient-radial from-gray-900 via-gray-800 to-gray-900',
};

export const transitions = {
  all: 'transition-all duration-300 ease-in-out',
  transform: 'transition-transform duration-300 ease-in-out',
  colors: 'transition-colors duration-300 ease-in-out',
  opacity: 'transition-opacity duration-300 ease-in-out',
};

export const containers = {
  card: `
    relative rounded-xl bg-[#1F1F1F]
    border border-white/10 backdrop-blur-sm
    shadow-lg transition-all duration-300
    hover:shadow-xl hover:border-white/20
  `,
  glass: `
    relative rounded-xl
    bg-white/5 backdrop-blur-md
    border border-white/10
    shadow-lg transition-all duration-300
    hover:shadow-xl hover:border-white/20
  `,
};
