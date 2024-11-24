/**
 * @file: types.ts
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
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

export type LayoutType = 'side-by-side' | 'circular' | 'process' | 'flower' | 'fan' | 'balance' | 'orbital';

export interface VisualizationStyles {
  layout: LayoutType;
  leftColor: string;
  rightColor: string;
  colorScheme: string;
  fontSize: 'small' | 'medium' | 'large';
}

export type ColorTheme = 'ocean' | 'sunset' | 'monochrome';

export type TextSize = 'compact' | 'regular' | 'large';
