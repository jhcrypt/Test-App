/**
 * @file: process-layout.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';

export interface ProcessLayoutProps {
  aspects: Aspect[];
  leftType: string;
  rightType: string;
  subject1: string;
  subject2: string;
  descriptions: {
    [key: string]: string;
  };
  colors: {
    left: string;
    right: string;
  };
  styles: VisualizationStyles;
  getFontSizeClasses: (type: 'title' | 'description' | 'aspect-title' | 'aspect-text') => string;
}

export function ProcessLayout({
  aspects,
  subject1,
  subject2,
  descriptions,
  colors,
  getFontSizeClasses,
}: ProcessLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12">
      {/* Headers */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Subject */}
        <div
          className={`
          rounded-2xl bg-gradient-to-br
          p-6 from-${colors.left}-500/10 border
          to-transparent border-${colors.left}-500/20 transform
          shadow-lg backdrop-blur-sm transition-transform
          hover:scale-[1.02] shadow-${colors.left}-500/5
        `}
        >
          <h2 className={`font-bold ${getFontSizeClasses('title')} text-${colors.left}-400 mb-2`}>
            {subject1}
          </h2>
          <p className={`${getFontSizeClasses('description')} text-gray-300`}>
            {descriptions[subject1]}
          </p>
        </div>

        {/* Right Subject */}
        <div
          className={`
          rounded-2xl bg-gradient-to-br
          p-6 from-${colors.right}-500/10 border
          to-transparent border-${colors.right}-500/20 transform
          shadow-lg backdrop-blur-sm transition-transform
          hover:scale-[1.02] shadow-${colors.right}-500/5
        `}
        >
          <h2 className={`font-bold ${getFontSizeClasses('title')} text-${colors.right}-400 mb-2`}>
            {subject2}
          </h2>
          <p className={`${getFontSizeClasses('description')} text-gray-300`}>
            {descriptions[subject2]}
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="space-y-6">
        {aspects.map((aspect, index) => (
          <div key={index} className="relative">
            {/* Step Number */}
            <div className="absolute -left-12 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center">
              <span className="text-sm font-medium text-gray-500">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Side */}
              <div
                className={`
                group relative rounded-2xl bg-gradient-to-br
                p-6 from-${colors.left}-500/5 border
                to-transparent border-${colors.left}-500/20 transform
                shadow-lg backdrop-blur-sm transition-transform
                hover:scale-[1.02] shadow-${colors.left}-500/5
              `}
              >
                {/* Aspect Title */}
                <div className="mb-4">
                  <h3
                    className={`font-medium ${getFontSizeClasses('aspect-title')} text-${colors.left}-300`}
                  >
                    {aspect.title}
                  </h3>
                  <div
                    className={`mt-2 h-0.5 w-16 bg-gradient-to-r from-${colors.left}-500/50 to-transparent`}
                  />
                </div>

                {/* Content */}
                <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                  {aspect.values[subject1]}
                </p>

                {/* Hover Effect */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0
                  group-hover:opacity-100 from-${colors.left}-500/5 to-transparent
                  transition-opacity duration-300
                `}
                />
              </div>

              {/* Right Side */}
              <div
                className={`
                group relative rounded-2xl bg-gradient-to-br
                p-6 from-${colors.right}-500/5 border
                to-transparent border-${colors.right}-500/20 transform
                shadow-lg backdrop-blur-sm transition-transform
                hover:scale-[1.02] shadow-${colors.right}-500/5
              `}
              >
                {/* Aspect Title */}
                <div className="mb-4">
                  <h3
                    className={`font-medium ${getFontSizeClasses('aspect-title')} text-${colors.right}-300`}
                  >
                    {aspect.title}
                  </h3>
                  <div
                    className={`mt-2 h-0.5 w-16 bg-gradient-to-r from-${colors.right}-500/50 to-transparent`}
                  />
                </div>

                {/* Content */}
                <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                  {aspect.values[subject2]}
                </p>

                {/* Hover Effect */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0
                  group-hover:opacity-100 from-${colors.right}-500/5 to-transparent
                  transition-opacity duration-300
                `}
                />
              </div>
            </div>

            {/* Connecting Line */}
            {index < aspects.length - 1 && (
              <div className="absolute left-1/2 top-full h-6 w-px -translate-x-1/2 bg-gradient-to-b from-gray-700 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
