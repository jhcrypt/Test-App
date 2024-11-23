export type LayoutType =
  | 'side-by-side'
  | 'process'
  | 'flower'
  | 'orbital'
  | 'fan'
  | 'balance'
  | 'circular'
  | 'flowchart';

export type ColorScheme = 'blue-green' | 'purple-orange' | 'gray';

export type FontSize = 'small' | 'medium' | 'large';

export interface Aspect {
  title: string;
  values: {
    [key: string]: string;
  };
}

export interface ComparisonData {
  subject1: string;
  subject2: string;
  descriptions: {
    [key: string]: string;
  };
  aspects: Aspect[];
}

export interface VisualizationStyles {
  layout: LayoutType;
  leftColor: string;
  rightColor: string;
  colorScheme: ColorScheme;
  fontSize: FontSize;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  bg: string;
  border: string;
}

export interface ThemeColors {
  left: ColorPalette;
  right: ColorPalette;
}

export type FontSizeType = 'title' | 'description' | 'aspect-title' | 'aspect-text';

export interface FontSizes {
  [key: string]: {
    [key in FontSizeType]: string;
  };
}

export interface StorageData {
  inputText: string;
  comparisonData: ComparisonData | null;
  styles: VisualizationStyles;
}

export interface KeyboardShortcut {
  key: string;
  handler: () => void;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  description?: string; // Added description property
}

export interface ShortcutHandlers {
  onTransform: () => void;
  onExport?: () => void;
  onReset?: () => void;
}

export interface ShortcutConfig {
  key: string;
  description: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}
