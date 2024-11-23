'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';

export interface FlowerLayoutProps {
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

export function FlowerLayout({
  aspects,
  subject1,
  subject2,
  descriptions,
  colors,
  getFontSizeClasses,
}: FlowerLayoutProps) {
  // Calculate positions for petals in a flower pattern
  const getPetalPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const innerRadius = 150; // Distance from center for inner petals
    const outerRadius = 280; // Distance from center for outer petals
    const x = Math.cos(angle) * (index % 2 === 0 ? innerRadius : outerRadius);
    const y = Math.sin(angle) * (index % 2 === 0 ? innerRadius : outerRadius);
    return { x, y, angle: (angle * 180) / Math.PI };
  };

  return (
    <div className="relative flex h-[800px] w-full items-center justify-center overflow-hidden">
      {/* Center Circle */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`
          h-64 w-64 rounded-full
          bg-gradient-to-br from-${colors.left}-500/10 via-purple-500/10 to-${colors.right}-500/10
          flex transform items-center
          justify-center border border-white/10 p-8
          shadow-lg shadow-purple-500/10 backdrop-blur-sm
          transition-transform hover:scale-105
        `}
        >
          <div className="space-y-4 text-center">
            <div>
              <h2 className={`font-bold ${getFontSizeClasses('title')} text-${colors.left}-400`}>
                {subject1}
              </h2>
              <p className={`${getFontSizeClasses('description')} mt-1 text-gray-400`}>
                {descriptions[subject1]}
              </p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div>
              <h2 className={`font-bold ${getFontSizeClasses('title')} text-${colors.right}-400`}>
                {subject2}
              </h2>
              <p className={`${getFontSizeClasses('description')} mt-1 text-gray-400`}>
                {descriptions[subject2]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        <defs>
          <radialGradient id="petalGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="300" fill="url(#petalGradient)" />
      </svg>

      {/* Petals */}
      {aspects.map((aspect, index) => {
        const position = getPetalPosition(index, aspects.length);
        const rotateText = position.angle > 90 || position.angle < -90;

        return (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
            style={{
              left: `calc(50% + ${position.x}px)`,
              top: `calc(50% + ${position.y}px)`,
              zIndex: 10,
            }}
          >
            <div
              className={`
              flex transform gap-4
              ${rotateText ? 'rotate-180' : ''}
            `}
            >
              {/* Left Petal */}
              <div
                className={`
                w-44 rounded-2xl bg-gradient-to-br
                p-4 from-${colors.left}-500/10 border
                to-transparent border-${colors.left}-500/20 transform
                shadow-lg backdrop-blur-sm transition-transform
                hover:scale-105 shadow-${colors.left}-500/5
              `}
              >
                <div className={rotateText ? 'rotate-180' : ''}>
                  <h3
                    className={`mb-2 font-medium ${getFontSizeClasses('aspect-title')} text-${colors.left}-300`}
                  >
                    {aspect.title}
                  </h3>
                  <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                    {aspect.values[subject1]}
                  </p>
                </div>
              </div>

              {/* Right Petal */}
              <div
                className={`
                w-44 rounded-2xl bg-gradient-to-br
                p-4 from-${colors.right}-500/10 border
                to-transparent border-${colors.right}-500/20 transform
                shadow-lg backdrop-blur-sm transition-transform
                hover:scale-105 shadow-${colors.right}-500/5
              `}
              >
                <div className={rotateText ? 'rotate-180' : ''}>
                  <h3
                    className={`mb-2 font-medium ${getFontSizeClasses('aspect-title')} text-${colors.right}-300`}
                  >
                    {aspect.title}
                  </h3>
                  <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                    {aspect.values[subject2]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Connecting Lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 5 }}>
        {aspects.map((_, index) => {
          const position = getPetalPosition(index, aspects.length);
          return (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${position.x}px)`}
              y2={`calc(50% + ${position.y}px)`}
              className="stroke-white/5"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>
    </div>
  );
}
