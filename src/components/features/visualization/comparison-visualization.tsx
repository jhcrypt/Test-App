'use client';

import { ComparisonData, VisualizationStyles } from '@/lib/types';
import {
  CircularLayout,
  ProcessLayout,
  FlowerLayout,
  OrbitalLayout,
  FanLayout,
  BalanceLayout
} from './layouts';
import { useEffect, useState } from 'react';
import { animations, borders, shadows } from '@/lib/styles';

interface ComparisonVisualizationProps {
  text: string;
  data: ComparisonData;
  styles: VisualizationStyles;
  getFontSizeClasses: (type: 'title' | 'description' | 'aspect-title' | 'aspect-text') => string;
}

export function ComparisonVisualization({
  text: _text,
  data,
  styles,
  getFontSizeClasses
}: ComparisonVisualizationProps) {
  // Use state to handle hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Common props for all layouts
  const layoutProps = {
    aspects: data.aspects,
    leftType: data.subject1,
    rightType: data.subject2,
    subject1: data.subject1,
    subject2: data.subject2,
    descriptions: data.descriptions,
    colors: {
      left: styles.leftColor,
      right: styles.rightColor
    },
    styles,
    getFontSizeClasses
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Container styles based on layout
  const getContainerStyles = () => {
    const baseStyles = `relative w-full h-full min-h-[800px] ${borders.rounded} bg-[#1F1F1F] border border-white/5 ${shadows.lg}`;
    
    switch (styles.layout) {
      case 'side-by-side':
      case 'process':
        return `${baseStyles} p-8 overflow-y-auto`;
      case 'circular':
      case 'orbital':
      case 'flower':
      case 'fan':
      case 'balance':
        return `${baseStyles} overflow-hidden flex items-center justify-center`;
      default:
        return `${baseStyles} p-8 overflow-auto`;
    }
  };

  // Layout wrapper styles based on layout type
  const getLayoutWrapperStyles = () => {
    switch (styles.layout) {
      case 'side-by-side':
      case 'process':
        return 'w-full h-full';
      case 'circular':
      case 'orbital':
      case 'flower':
      case 'fan':
      case 'balance':
        return 'w-full h-full flex items-center justify-center';
      default:
        return 'w-full h-full';
    }
  };

  // Render the appropriate layout based on style selection
  const renderLayout = () => {
    switch (styles.layout) {
      case 'process':
      case 'flowchart':
        return <ProcessLayout {...layoutProps} />;
      
      case 'flower':
        return <FlowerLayout {...layoutProps} />;
      
      case 'orbital':
        return <OrbitalLayout {...layoutProps} />;
      
      case 'fan':
        return <FanLayout {...layoutProps} />;
      
      case 'balance':
        return <BalanceLayout {...layoutProps} />;

      case 'circular':
        return <CircularLayout {...layoutProps} />;
      
      // Default side-by-side layout
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className={`
              p-6 ${borders.rounded}
              bg-${styles.leftColor}-500/5
              border border-${styles.leftColor}-500/20
              backdrop-blur-sm
              ${animations.scaleOnHover}
              ${shadows.lg}
            `}>
              <h2 className={`font-bold mb-4 ${getFontSizeClasses('title')} text-${styles.leftColor}-400`}>
                {data.subject1}
              </h2>
              <p className={`mb-6 ${getFontSizeClasses('description')} text-gray-300`}>
                {data.descriptions[data.subject1]}
              </p>
              <div className="space-y-4">
                {data.aspects.map((aspect, index) => (
                  <div key={index} className="border-l-2 border-gray-700 pl-4">
                    <h3 className={`font-medium mb-2 ${getFontSizeClasses('aspect-title')} text-${styles.leftColor}-300`}>
                      {aspect.title}
                    </h3>
                    <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                      {aspect.values[data.subject1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className={`
              p-6 ${borders.rounded}
              bg-${styles.rightColor}-500/5
              border border-${styles.rightColor}-500/20
              backdrop-blur-sm
              ${animations.scaleOnHover}
              ${shadows.lg}
            `}>
              <h2 className={`font-bold mb-4 ${getFontSizeClasses('title')} text-${styles.rightColor}-400`}>
                {data.subject2}
              </h2>
              <p className={`mb-6 ${getFontSizeClasses('description')} text-gray-300`}>
                {data.descriptions[data.subject2]}
              </p>
              <div className="space-y-4">
                {data.aspects.map((aspect, index) => (
                  <div key={index} className="border-l-2 border-gray-700 pl-4">
                    <h3 className={`font-medium mb-2 ${getFontSizeClasses('aspect-title')} text-${styles.rightColor}-300`}>
                      {aspect.title}
                    </h3>
                    <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                      {aspect.values[data.subject2]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={getContainerStyles()}>
      <div className={getLayoutWrapperStyles()}>
        {renderLayout()}
      </div>
    </div>
  );
}
