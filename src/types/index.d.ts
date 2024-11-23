declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface VisualizationData {
  id: string;
  type: 'wordcloud' | 'chart' | 'mindmap';
  input: string;
  output: any; // Will be refined based on visualization type
  settings: {
    style: string;
    colors: string[];
    dimensions: {
      width: number;
      height: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultVisualization: VisualizationData['type'];
  colorScheme: string;
  fontSize: number;
}

interface ProcessingOptions {
  preserveFormatting?: boolean;
  maxLength?: number;
  language?: string;
}

interface ExportOptions {
  format: 'png' | 'svg' | 'pdf';
  quality: 'web' | 'print';
  scale: number;
}
