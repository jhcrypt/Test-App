/**
 * @file: page.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

// TODO [2024-11-24]: Current State - Main Page Component
// Working:
// - Component layout and styling
// - State management setup
// - Format options UI
// Issues:
// - Data flow from text input to visualization
// - Need to verify state updates
// Next Steps:
// - Add console logs to track state changes
// - Verify handleTransform is updating state correctly
// - Debug visualization rendering

import { useState } from 'react';
import { TextInputSection } from '@/components/features/text-input/text-input-section';
import { ComparisonVisualization } from '@/components/features/visualization/comparison-visualization';
import { LayoutSelector } from '@/components/features/visualization/layout-selector';
import { StyleOptions } from '@/components/features/visualization/style-options';
import { parseComparisonText } from '@/lib/utils';
import { ComparisonData, LayoutType, ColorTheme, TextSize } from '@/lib/types';
import { getFontSizeClasses } from '@/lib/styles';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [layout, setLayout] = useState<LayoutType>('circular');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('ocean');
  const [textSize, setTextSize] = useState<TextSize>('regular');
  const [showFormats, setShowFormats] = useState(false);

  const handleTransform = () => {
    setIsProcessing(true);
    const data = parseComparisonText(inputText);
    setComparisonData(data);
    setIsProcessing(false);
  };

  const getColorsByTheme = (theme: ColorTheme) => {
    switch (theme) {
      case 'ocean':
        return { left: 'blue', right: 'green' };
      case 'sunset':
        return { left: 'purple', right: 'orange' };
      case 'monochrome':
        return { left: 'gray', right: 'gray' };
      default:
        return { left: 'blue', right: 'green' };
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Text to Visual Comparison
          </h1>
          <p className="text-gray-400">
            Transform your text into beautiful visual comparisons
          </p>
        </div>

        <div className="relative">
          {/* Show Formats Button */}
          <button
            onClick={() => setShowFormats(!showFormats)}
            className="absolute -top-10 right-0 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {showFormats ? 'Hide Formats' : 'Show Formats'}
          </button>

          <TextInputSection
            onChange={setInputText}
            onTransform={handleTransform}
            isProcessing={isProcessing}
          />

          {/* Style Options */}
          {showFormats && (
            <div className="absolute left-0 right-0 mt-4 space-y-8 rounded-xl border border-white/10 bg-[#242424] p-6 shadow-lg">
              <LayoutSelector
                currentLayout={layout}
                onLayoutChange={setLayout}
              />
              <StyleOptions
                colorTheme={colorTheme}
                textSize={textSize}
                onColorThemeChange={setColorTheme}
                onTextSizeChange={setTextSize}
              />
            </div>
          )}
        </div>

        {comparisonData && (
          <div className="mt-8">
            <ComparisonVisualization
              text={inputText}
              data={comparisonData}
              styles={{
                layout,
                leftColor: getColorsByTheme(colorTheme).left,
                rightColor: getColorsByTheme(colorTheme).right,
                colorScheme: colorTheme,
                fontSize: textSize === 'compact' ? 'small' : textSize === 'regular' ? 'medium' : 'large'
              }}
              getFontSizeClasses={(type) => getFontSizeClasses(
                textSize === 'compact' ? 'small' : textSize === 'regular' ? 'medium' : 'large',
                type
              )}
            />
          </div>
        )}
      </div>
    </main>
  );
}
