'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';

export interface OrbitalLayoutProps {
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

export function OrbitalLayout({
  aspects,
  subject1,
  subject2,
  descriptions,
  colors,
  getFontSizeClasses,
}: OrbitalLayoutProps) {
  // Calculate positions for orbiting elements
  const getOrbitalPosition = (index: number, total: number, radius: number, offset: number = 0) => {
    const angle = (index * 2 * Math.PI) / total + offset;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle: (angle * 180) / Math.PI };
  };

  return (
    <div className="relative flex h-[800px] w-full items-center justify-center overflow-hidden">
      {/* Central Subjects */}
      <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 gap-32">
        {/* Left Subject */}
        <div
          className={`
          h-48 w-48 rounded-full
          bg-gradient-to-br from-${colors.left}-500/20 to-${colors.left}-500/5
          border border-${colors.left}-500/20 flex
          transform items-center justify-center p-6
          shadow-lg backdrop-blur-sm transition-transform
          hover:scale-105 shadow-${colors.left}-500/10
        `}
        >
          <div className="text-center">
            <h2 className={`font-bold ${getFontSizeClasses('title')} text-${colors.left}-400 mb-2`}>
              {subject1}
            </h2>
            <p className={`${getFontSizeClasses('description')} text-gray-300`}>
              {descriptions[subject1]}
            </p>
          </div>
        </div>

        {/* Right Subject */}
        <div
          className={`
          h-48 w-48 rounded-full
          bg-gradient-to-br from-${colors.right}-500/20 to-${colors.right}-500/5
          border border-${colors.right}-500/20 flex
          transform items-center justify-center p-6
          shadow-lg backdrop-blur-sm transition-transform
          hover:scale-105 shadow-${colors.right}-500/10
        `}
        >
          <div className="text-center">
            <h2
              className={`font-bold ${getFontSizeClasses('title')} text-${colors.right}-400 mb-2`}
            >
              {subject2}
            </h2>
            <p className={`${getFontSizeClasses('description')} text-gray-300`}>
              {descriptions[subject2]}
            </p>
          </div>
        </div>
      </div>

      {/* Orbital Paths */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        {/* Left Orbit Path */}
        <ellipse
          cx="calc(50% - 120px)"
          cy="50%"
          rx="200"
          ry="180"
          fill="none"
          className={`stroke-${colors.left}-500/10`}
          strokeWidth="1"
          strokeDasharray="4 4"
          transform="rotate(-30, calc(50% - 120px), 50%)"
        />
        {/* Right Orbit Path */}
        <ellipse
          cx="calc(50% + 120px)"
          cy="50%"
          rx="200"
          ry="180"
          fill="none"
          className={`stroke-${colors.right}-500/10`}
          strokeWidth="1"
          strokeDasharray="4 4"
          transform="rotate(30, calc(50% + 120px), 50%)"
        />
      </svg>

      {/* Orbiting Aspects */}
      {aspects.map((aspect, index) => {
        const leftPosition = getOrbitalPosition(index, aspects.length, 200, -Math.PI / 6);
        const rightPosition = getOrbitalPosition(index, aspects.length, 200, Math.PI - Math.PI / 6);

        return (
          <div key={index}>
            {/* Left Orbit */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 transform"
              style={{
                left: `calc(50% - 120px + ${leftPosition.x}px)`,
                top: `calc(50% + ${leftPosition.y}px)`,
                zIndex: 10,
              }}
            >
              <div
                className={`
                w-40 rounded-xl p-4
                bg-${colors.left}-500/5 border border-${colors.left}-500/20
                transform
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

            {/* Right Orbit */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 transform"
              style={{
                left: `calc(50% + 120px + ${rightPosition.x}px)`,
                top: `calc(50% + ${rightPosition.y}px)`,
                zIndex: 10,
              }}
            >
              <div
                className={`
                w-40 rounded-xl p-4
                bg-${colors.right}-500/5 border border-${colors.right}-500/20
                transform
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
          const leftPosition = getOrbitalPosition(index, aspects.length, 200, -Math.PI / 6);
          const rightPosition = getOrbitalPosition(
            index,
            aspects.length,
            200,
            Math.PI - Math.PI / 6
          );
          return (
            <g key={index}>
              <line
                x1={`calc(50% - 120px)`}
                y1="50%"
                x2={`calc(50% - 120px + ${leftPosition.x}px)`}
                y2={`calc(50% + ${leftPosition.y}px)`}
                className={`stroke-${colors.left}-500/20`}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={`calc(50% + 120px)`}
                y1="50%"
                x2={`calc(50% + 120px + ${rightPosition.x}px)`}
                y2={`calc(50% + ${rightPosition.y}px)`}
                className={`stroke-${colors.right}-500/20`}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
