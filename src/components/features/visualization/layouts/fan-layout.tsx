'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';

export interface FanLayoutProps {
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

export function FanLayout({
  aspects,
  subject1,
  subject2,
  descriptions,
  colors,
  getFontSizeClasses,
}: FanLayoutProps) {
  // Calculate positions for fan segments
  const getFanPosition = (index: number, total: number, side: 'left' | 'right') => {
    const fanSpread = 150; // Degrees of the fan spread
    const startAngle = -fanSpread / 2;
    const angleStep = fanSpread / (total - 1 || 1);
    const angle = startAngle + index * angleStep;
    const radius = 300;

    // Convert angle to radians and calculate position
    const radians = (angle * Math.PI) / 180;
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;

    // Adjust x based on side
    const adjustedX = side === 'left' ? -Math.abs(x) : Math.abs(x);

    return {
      x: adjustedX,
      y,
      angle: angle + (side === 'left' ? 180 : 0), // Rotate text for readability
    };
  };

  return (
    <div className="relative flex h-[800px] w-full items-center justify-center overflow-hidden">
      {/* Center Headers */}
      <div className="absolute left-0 right-0 top-8 z-20 flex justify-center gap-8">
        {/* Left Subject */}
        <div
          className={`
          rounded-2xl bg-gradient-to-br
          p-6 from-${colors.left}-500/10 border
          to-transparent border-${colors.left}-500/20 transform
          shadow-lg backdrop-blur-sm transition-transform
          hover:scale-105 shadow-${colors.left}-500/5
          max-w-xs
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
          hover:scale-105 shadow-${colors.right}-500/5
          max-w-xs
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

      {/* Background Decoration */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="leftGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={`rgb(var(--${colors.left}-500-rgb), 0.05)`} />
            <stop offset="100%" stopColor={`rgb(var(--${colors.left}-500-rgb), 0)`} />
          </linearGradient>
          <linearGradient id="rightGradient" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor={`rgb(var(--${colors.right}-500-rgb), 0.05)`} />
            <stop offset="100%" stopColor={`rgb(var(--${colors.right}-500-rgb), 0)`} />
          </linearGradient>
        </defs>
        <path
          d="M 0,400 C 200,300 300,200 400,0 V 800 C 300,600 200,500 0,400 Z"
          fill="url(#leftGradient)"
        />
        <path
          d="M 800,400 C 600,300 500,200 400,0 V 800 C 500,600 600,500 800,400 Z"
          fill="url(#rightGradient)"
        />
      </svg>

      {/* Fan Elements */}
      <div className="relative mt-32">
        {aspects.map((aspect, index) => {
          const leftPos = getFanPosition(index, aspects.length, 'left');
          const rightPos = getFanPosition(index, aspects.length, 'right');

          return (
            <div key={index}>
              {/* Left Fan Segment */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                style={{
                  left: `calc(50% + ${leftPos.x}px)`,
                  top: `calc(50% + ${leftPos.y}px)`,
                  zIndex: 10,
                }}
              >
                <div
                  className={`
                  w-48 rounded-2xl bg-gradient-to-br
                  p-4 from-${colors.left}-500/10 border
                  to-transparent border-${colors.left}-500/20 transform
                  shadow-lg backdrop-blur-sm transition-transform
                  hover:scale-105 shadow-${colors.left}-500/5
                `}
                >
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

              {/* Right Fan Segment */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                style={{
                  left: `calc(50% + ${rightPos.x}px)`,
                  top: `calc(50% + ${rightPos.y}px)`,
                  zIndex: 10,
                }}
              >
                <div
                  className={`
                  w-48 rounded-2xl bg-gradient-to-br
                  p-4 from-${colors.right}-500/10 border
                  to-transparent border-${colors.right}-500/20 transform
                  shadow-lg backdrop-blur-sm transition-transform
                  hover:scale-105 shadow-${colors.right}-500/5
                `}
                >
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
          );
        })}

        {/* Connecting Lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 5 }}>
          {aspects.map((_, index) => {
            const leftPos = getFanPosition(index, aspects.length, 'left');
            const rightPos = getFanPosition(index, aspects.length, 'right');

            return (
              <g key={index}>
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${leftPos.x}px)`}
                  y2={`calc(50% + ${leftPos.y}px)`}
                  className={`stroke-${colors.left}-500/20`}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${rightPos.x}px)`}
                  y2={`calc(50% + ${rightPos.y}px)`}
                  className={`stroke-${colors.right}-500/20`}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
