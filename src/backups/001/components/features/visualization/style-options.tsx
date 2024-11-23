'use client';

import React from 'react';

interface StyleOptionsProps {
  onStyleChange: (styles: VisualizationStyles) => void;
  currentStyles: VisualizationStyles;
}

export interface VisualizationStyles {
  leftColor: string;
  rightColor: string;
  layout: 'side-by-side' | 'cards' | 'minimal';
  fontSize: 'small' | 'medium' | 'large';
}

export function StyleOptions({ onStyleChange, currentStyles }: StyleOptionsProps) {
  const colorSchemes = [
    { label: 'Blue/Green', left: 'blue', right: 'green' },
    { label: 'Purple/Orange', left: 'purple', right: 'orange' },
    { label: 'Gray', left: 'gray', right: 'gray' },
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const layouts = [
    { value: 'side-by-side', label: 'Side by Side' },
    { value: 'cards', label: 'Cards' },
    { value: 'minimal', label: 'Minimal' },
  ];

  return (
    <div className="space-y-6">
      {/* Color Theme */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Color Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {colorSchemes.map(scheme => {
            const isActive = currentStyles.leftColor === scheme.left;
            return (
              <button
                key={scheme.label}
                onClick={() =>
                  onStyleChange({
                    ...currentStyles,
                    leftColor: scheme.left,
                    rightColor: scheme.right,
                  })
                }
                className={`
                  rounded-xl p-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-[#F8FAFC] text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {scheme.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Text Size</label>
        <div className="grid grid-cols-3 gap-3">
          {fontSizes.map(size => {
            const isActive = currentStyles.fontSize === size.value;
            return (
              <button
                key={size.value}
                onClick={() =>
                  onStyleChange({
                    ...currentStyles,
                    fontSize: size.value as 'small' | 'medium' | 'large',
                  })
                }
                className={`
                  rounded-xl p-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-[#F8FAFC] text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {size.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Style */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Layout Style</label>
        <div className="grid grid-cols-3 gap-3">
          {layouts.map(layout => {
            const isActive = currentStyles.layout === layout.value;
            return (
              <button
                key={layout.value}
                onClick={() =>
                  onStyleChange({
                    ...currentStyles,
                    layout: layout.value as 'side-by-side' | 'cards' | 'minimal',
                  })
                }
                className={`
                  rounded-xl p-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-[#F8FAFC] text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {layout.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
