'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';

export interface BalanceLayoutProps {
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

export function BalanceLayout({
  aspects,
  subject1,
  subject2,
  descriptions,
  colors,
  getFontSizeClasses,
}: BalanceLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Balance Beam */}
      <div className="relative mb-16 flex justify-center">
        <div className="h-40 w-2 rounded-full bg-gradient-to-b from-gray-700 to-gray-700/50" />
        <div className="absolute bottom-0 left-1/2 h-2 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-gray-700/50 via-gray-700 to-gray-700/50" />
      </div>

      {/* Headers */}
      <div className="mb-12 grid grid-cols-2 gap-40">
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

      {/* Balance Scales */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Left Scale */}
          {aspects.map((aspect, index) => (
            <div
              key={index}
              className={`
                group relative rounded-2xl bg-gradient-to-br
                p-6 from-${colors.left}-500/5 border
                to-transparent border-${colors.left}-500/20 transform
                shadow-lg backdrop-blur-sm transition-transform
                hover:scale-[1.02] shadow-${colors.left}-500/5
                ml-${index * 4}
              `}
              style={{
                marginLeft: `${index * 16}px`,
                marginTop: `${index * 8}px`,
              }}
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

              {/* Weight Line */}
              <div className="absolute -top-4 right-8 h-4 w-px bg-gradient-to-b from-gray-700 to-transparent" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {/* Right Scale */}
          {aspects.map((aspect, index) => (
            <div
              key={index}
              className={`
                group relative rounded-2xl bg-gradient-to-br
                p-6 from-${colors.right}-500/5 border
                to-transparent border-${colors.right}-500/20 transform
                shadow-lg backdrop-blur-sm transition-transform
                hover:scale-[1.02] shadow-${colors.right}-500/5
                ml-${index * 4}
              `}
              style={{
                marginLeft: `${index * 16}px`,
                marginTop: `${index * 8}px`,
              }}
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

              {/* Weight Line */}
              <div className="absolute -top-4 right-8 h-4 w-px bg-gradient-to-b from-gray-700 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        <line
          x1="30%"
          y1="200"
          x2="30%"
          y2="300"
          className="stroke-gray-700/30"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="70%"
          y1="200"
          x2="70%"
          y2="300"
          className="stroke-gray-700/30"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
