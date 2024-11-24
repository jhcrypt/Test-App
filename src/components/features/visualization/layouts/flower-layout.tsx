/**
 * @file: flower-layout.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';
import { animations, borders, shadows } from '@/lib/styles';

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
  // Calculate positions for flower petal arrangement
  const getPetalPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const rotation = (angle * 180) / Math.PI;
    return { x, y, rotation };
  };

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center p-8">
      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`
          w-48 h-48 ${borders.circle}
          bg-gradient-to-br from-${colors.left}-500/10 to-${colors.right}-500/10
          border border-white/10 backdrop-blur-sm
          flex flex-col items-center justify-center text-center
          ${shadows.xl}
        `}>
          <h2 className={`${getFontSizeClasses('title')} text-${colors.left}-400 mb-2`}>
            {subject1}
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent my-2" />
          <h2 className={`${getFontSizeClasses('title')} text-${colors.right}-400 mt-2`}>
            {subject2}
          </h2>
        </div>
      </div>

      {/* Flower Petals */}
      {aspects.map((aspect, index) => {
        const position = getPetalPosition(index, aspects.length, 250);
        const delay = index * 100;

        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
            style={{
              left: `calc(50% + ${position.x}px)`,
              top: `calc(50% + ${position.y}px)`,
              transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
              transitionDelay: `${delay}ms`,
            }}
          >
            <div className={`
              w-40 p-4 ${borders.rounded}
              bg-gradient-to-br from-${colors.left}-500/5 to-transparent
              border border-${colors.left}-500/20 backdrop-blur-sm
              ${animations.scaleOnHover}
              ${shadows.lg}
            `}
            style={{
              transform: `rotate(${-position.rotation}deg)`,
            }}
            >
              <h3 className={`font-medium mb-2 ${getFontSizeClasses('aspect-title')} text-${colors.left}-300`}>
                {aspect.title}
              </h3>
              <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                {aspect.values[subject1]}
              </p>
            </div>
          </div>
        );
      })}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgb(var(--${colors.left}-500) / 0.2)`} />
            <stop offset="100%" stopColor={`rgb(var(--${colors.right}-500) / 0.2)`} />
          </linearGradient>
        </defs>
        {aspects.map((_, index) => {
          const position = getPetalPosition(index, aspects.length, 250);
          return (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${position.x}px)`}
              y2={`calc(50% + ${position.y}px)`}
              stroke="url(#petalGradient)"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="transition-opacity duration-700 ease-out"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
