/**
 * @file: balance-layout.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

import { Aspect, VisualizationStyles } from '@/lib/types';
import { animations, borders, shadows } from '@/lib/styles';

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
  // Calculate positions for balance scale arrangement
  const getBalancePosition = (index: number, total: number, side: 'left' | 'right') => {
    const radius = 200;
    const angleSpread = Math.PI / 3; // 60 degrees
    const baseAngle = side === 'left' ? Math.PI + angleSpread : -angleSpread;
    const angleStep = (Math.PI / 3) / (total - 1);
    const angle = baseAngle + index * angleStep;
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius + 100; // Offset down from center
    return { x, y };
  };

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center p-8">
      {/* Center Balance Point */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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

      {/* Balance Scale Elements */}
      {aspects.map((aspect, index) => {
        // Create positions for both left and right sides
        const leftPosition = getBalancePosition(index, aspects.length, 'left');
        const rightPosition = getBalancePosition(index, aspects.length, 'right');
        const delay = index * 100;

        return (
          <div key={index}>
            {/* Left Side */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
              style={{
                left: `calc(50% + ${leftPosition.x}px)`,
                top: `calc(50% + ${leftPosition.y}px)`,
                transitionDelay: `${delay}ms`,
              }}
            >
              <div className={`
                w-40 p-4 ${borders.rounded}
                bg-gradient-to-br from-${colors.left}-500/5 to-transparent
                border border-${colors.left}-500/20 backdrop-blur-sm
                ${animations.scaleOnHover}
                ${shadows.lg}
              `}>
                <h3 className={`font-medium mb-2 ${getFontSizeClasses('aspect-title')} text-${colors.left}-300`}>
                  {aspect.title}
                </h3>
                <p className={`${getFontSizeClasses('aspect-text')} text-gray-400`}>
                  {aspect.values[subject1]}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
              style={{
                left: `calc(50% + ${rightPosition.x}px)`,
                top: `calc(50% + ${rightPosition.y}px)`,
                transitionDelay: `${delay}ms`,
              }}
            >
              <div className={`
                w-40 p-4 ${borders.rounded}
                bg-gradient-to-br from-${colors.right}-500/5 to-transparent
                border border-${colors.right}-500/20 backdrop-blur-sm
                ${animations.scaleOnHover}
                ${shadows.lg}
              `}>
                <h3 className={`font-medium mb-2 ${getFontSizeClasses('aspect-title')} text-${colors.right}-300`}>
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

      {/* Balance Scale Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgb(var(--${colors.left}-500) / 0.2)`} />
            <stop offset="100%" stopColor={`rgb(var(--${colors.right}-500) / 0.2)`} />
          </linearGradient>
        </defs>
        {/* Center Support Line */}
        <line
          x1="50%"
          y1="33%"
          x2="50%"
          y2="20%"
          stroke="url(#balanceGradient)"
          strokeWidth="2"
        />
        {/* Balance Beam */}
        <line
          x1="25%"
          y1="33%"
          x2="75%"
          y2="33%"
          stroke="url(#balanceGradient)"
          strokeWidth="2"
        />
        {/* Connection Lines */}
        {aspects.map((_, index) => {
          const leftPos = getBalancePosition(index, aspects.length, 'left');
          const rightPos = getBalancePosition(index, aspects.length, 'right');
          return (
            <g key={index}>
              <line
                x1="50%"
                y1="33%"
                x2={`calc(50% + ${leftPos.x}px)`}
                y2={`calc(50% + ${leftPos.y}px)`}
                stroke="url(#balanceGradient)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="transition-opacity duration-700 ease-out"
                style={{ transitionDelay: `${index * 100}ms` }}
              />
              <line
                x1="50%"
                y1="33%"
                x2={`calc(50% + ${rightPos.x}px)`}
                y2={`calc(50% + ${rightPos.y}px)`}
                stroke="url(#balanceGradient)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="transition-opacity duration-700 ease-out"
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
