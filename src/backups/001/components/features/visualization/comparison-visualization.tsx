/**
 * @file: comparison-visualization.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

import React from 'react';
import type { VisualizationStyles } from './style-options';

interface ComparisonVisualizationProps {
  text: string;
  styles: VisualizationStyles;
}

export function ComparisonVisualization({ text, styles }: ComparisonVisualizationProps) {
  // Parse the comparison text
  const parseComparisonText = (text: string) => {
    // Extract the main subjects being compared
    const compareMatch = text.toLowerCase().match(/compare\s+([^and]+)\s+and\s+([^in\s]+)/i);
    if (!compareMatch) {
      return null;
    }

    const subject1 = compareMatch[1].trim();
    const subject2 = compareMatch[2].trim();

    // Extract aspects being compared
    const aspectsMatch = text.match(/in terms of\s+(.+)/i);
    const aspects = aspectsMatch
      ? aspectsMatch[1].split(/,\s*and\s*|\s*,\s*/).map(aspect => aspect.trim().replace(/\.$/, ''))
      : [];

    return {
      subject1: {
        title: subject1.charAt(0).toUpperCase() + subject1.slice(1),
        description: `Information about ${subject1}`,
        features: aspects.map(aspect => ({
          title: aspect.charAt(0).toUpperCase() + aspect.slice(1),
          value: `${subject1} ${aspect}`,
        })),
      },
      subject2: {
        title: subject2.charAt(0).toUpperCase() + subject2.slice(1),
        description: `Information about ${subject2}`,
        features: aspects.map(aspect => ({
          title: aspect.charAt(0).toUpperCase() + aspect.slice(1),
          value: `${subject2} ${aspect}`,
        })),
      },
    };
  };

  const comparison = parseComparisonText(text);
  if (!comparison) return null;

  const getColorClass = (side: 'left' | 'right') => {
    const color = side === 'left' ? styles.leftColor : styles.rightColor;
    return {
      bg: `bg-${color}-50`,
      border: `border-${color}-100`,
      text: `text-${color}-700`,
      heading: `text-${color}-900`,
    };
  };

  const getFontSizeClass = (type: 'heading' | 'description' | 'feature') => {
    switch (styles.fontSize) {
      case 'small':
        return type === 'heading' ? 'text-lg' : type === 'description' ? 'text-sm' : 'text-xs';
      case 'large':
        return type === 'heading' ? 'text-2xl' : type === 'description' ? 'text-lg' : 'text-base';
      default:
        return type === 'heading' ? 'text-xl' : type === 'description' ? 'text-base' : 'text-sm';
    }
  };

  const leftColors = getColorClass('left');
  const rightColors = getColorClass('right');

  // Render functions for different layouts
  const renderSideBySide = () => (
    <div className="grid grid-cols-2 gap-8 rounded-xl bg-white p-6 shadow-sm">
      {/* Left Column */}
      <div className={`${leftColors.bg} ${leftColors.border} rounded-xl border p-6`}>
        <h3 className={`font-semibold ${leftColors.heading} mb-3 ${getFontSizeClass('heading')}`}>
          {comparison.subject1.title}
        </h3>
        <p className={`${leftColors.text} mb-6 ${getFontSizeClass('description')}`}>
          {comparison.subject1.description}
        </p>
        <div className="space-y-4">
          {comparison.subject1.features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white/60 p-4 backdrop-blur-sm">
              <div className={`font-medium ${leftColors.heading} ${getFontSizeClass('feature')}`}>
                {feature.title}
              </div>
              <div className={`mt-1 ${leftColors.text} ${getFontSizeClass('feature')}`}>
                {feature.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className={`${rightColors.bg} ${rightColors.border} rounded-xl border p-6`}>
        <h3 className={`font-semibold ${rightColors.heading} mb-3 ${getFontSizeClass('heading')}`}>
          {comparison.subject2.title}
        </h3>
        <p className={`${rightColors.text} mb-6 ${getFontSizeClass('description')}`}>
          {comparison.subject2.description}
        </p>
        <div className="space-y-4">
          {comparison.subject2.features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white/60 p-4 backdrop-blur-sm">
              <div className={`font-medium ${rightColors.heading} ${getFontSizeClass('feature')}`}>
                {feature.title}
              </div>
              <div className={`mt-1 ${rightColors.text} ${getFontSizeClass('feature')}`}>
                {feature.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm">
      <div className={`${leftColors.bg} ${leftColors.border} rounded-xl border p-6`}>
        <h3 className={`font-semibold ${leftColors.heading} mb-3 ${getFontSizeClass('heading')}`}>
          {comparison.subject1.title}
        </h3>
        <p className={`${leftColors.text} mb-6 ${getFontSizeClass('description')}`}>
          {comparison.subject1.description}
        </p>
        <div className="space-y-4">
          {comparison.subject1.features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white/60 p-4 backdrop-blur-sm">
              <div className={`font-medium ${leftColors.heading} ${getFontSizeClass('feature')}`}>
                {feature.title}
              </div>
              <div className={`mt-1 ${leftColors.text} ${getFontSizeClass('feature')}`}>
                {feature.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${rightColors.bg} ${rightColors.border} rounded-xl border p-6`}>
        <h3 className={`font-semibold ${rightColors.heading} mb-3 ${getFontSizeClass('heading')}`}>
          {comparison.subject2.title}
        </h3>
        <p className={`${rightColors.text} mb-6 ${getFontSizeClass('description')}`}>
          {comparison.subject2.description}
        </p>
        <div className="space-y-4">
          {comparison.subject2.features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white/60 p-4 backdrop-blur-sm">
              <div className={`font-medium ${rightColors.heading} ${getFontSizeClass('feature')}`}>
                {feature.title}
              </div>
              <div className={`mt-1 ${rightColors.text} ${getFontSizeClass('feature')}`}>
                {feature.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className={`mb-3 font-semibold text-gray-900 ${getFontSizeClass('heading')}`}>
            {comparison.subject1.title}
          </h3>
          <div className="space-y-4">
            {comparison.subject1.features.map((feature, index) => (
              <div key={index} className="border-b border-gray-100 pb-2">
                <div className={`font-medium text-gray-700 ${getFontSizeClass('feature')}`}>
                  {feature.title}
                </div>
                <div className={`mt-1 text-gray-600 ${getFontSizeClass('feature')}`}>
                  {feature.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`mb-3 font-semibold text-gray-900 ${getFontSizeClass('heading')}`}>
            {comparison.subject2.title}
          </h3>
          <div className="space-y-4">
            {comparison.subject2.features.map((feature, index) => (
              <div key={index} className="border-b border-gray-100 pb-2">
                <div className={`font-medium text-gray-700 ${getFontSizeClass('feature')}`}>
                  {feature.title}
                </div>
                <div className={`mt-1 text-gray-600 ${getFontSizeClass('feature')}`}>
                  {feature.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate layout
  switch (styles.layout) {
    case 'cards':
      return renderCards();
    case 'minimal':
      return renderMinimal();
    default:
      return renderSideBySide();
  }
}
