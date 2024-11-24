/**
 * @file: layout-selector.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

import { LayoutType } from '@/lib/types';

interface LayoutOption {
  value: LayoutType;
  label: string;
  icon: JSX.Element;
  description: string;
}

const layouts: LayoutOption[] = [
  {
    value: 'side-by-side',
    label: 'Side by Side',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="4" width="8" height="16" rx="1" />
        <rect x="14" y="4" width="8" height="16" rx="1" />
      </svg>
    ),
    description: 'Compare items in parallel columns',
  },
  {
    value: 'circular',
    label: 'Circular',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 4v16M4 12h16" strokeLinecap="round" />
      </svg>
    ),
    description: 'Radial comparison with central focus',
  },
  {
    value: 'process',
    label: 'Process',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="4" rx="1" />
        <rect x="4" y="16" width="16" height="4" rx="1" />
        <path d="M12 8v8M8 12l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: 'Step-by-step comparison flow',
  },
  {
    value: 'orbital',
    label: 'Orbital',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" strokeDasharray="4 4" />
        <path d="M12 5a7 7 0 0 1 0 14 7 7 0 0 1 0-14" strokeDasharray="4 4" />
      </svg>
    ),
    description: 'Aspects orbit around central subjects',
  },
  {
    value: 'flower',
    label: 'Flower',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9a3 3 0 0 1 6 0c0 2-3 3-3 3m-3-3a3 3 0 0 0-6 0c0 2 3 3 3 3m3 3a3 3 0 0 1 0 6c-2 0-3-3-3-3m3-3a3 3 0 0 0 0-6c-2 0-3 3-3 3" />
      </svg>
    ),
    description: 'Petal-like arrangement of aspects',
  },
  {
    value: 'fan',
    label: 'Fan',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v20M12 12l8-8M12 12l8 8M12 12l-8-8M12 12l-8 8" strokeLinecap="round" />
      </svg>
    ),
    description: 'Fan-shaped comparison layout',
  },
  {
    value: 'balance',
    label: 'Balance',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v4M3 18h18M7 18c0-3 5-12 5-12s5 9 5 12" strokeLinecap="round" />
      </svg>
    ),
    description: 'Weighted comparison view',
  },
];

interface LayoutSelectorProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

export function LayoutSelector({ currentLayout, onLayoutChange }: LayoutSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-200">Layout Style</label>
        <span className="text-xs text-gray-500">
          Choose a layout that best represents your comparison
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {layouts.map(layout => (
          <button
            key={layout.value}
            onClick={() => onLayoutChange(layout.value)}
            className={`
              group relative rounded-xl p-4 text-sm transition-all
              hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20
              ${
                currentLayout === layout.value
                  ? 'bg-[#2A2A2A] shadow-lg shadow-purple-500/5'
                  : 'bg-[#242424] hover:bg-[#282828]'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              {/* Icon Container */}
              <div
                className={`
                rounded-lg p-3 transition-colors
                ${
                  currentLayout === layout.value
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                    : 'bg-[#2A2A2A] group-hover:bg-[#303030]'
                }
              `}
              >
                <div
                  className={`
                  transition-transform group-hover:scale-110
                  ${currentLayout === layout.value ? 'text-white' : 'text-gray-400'}
                `}
                >
                  {layout.icon}
                </div>
              </div>

              {/* Label */}
              <span
                className={`
                font-medium transition-colors
                ${currentLayout === layout.value ? 'text-white' : 'text-gray-400'}
              `}
              >
                {layout.label}
              </span>

              {/* Description */}
              <span className="text-center text-xs text-gray-500">{layout.description}</span>
            </div>

            {/* Selected Indicator */}
            {currentLayout === layout.value && (
              <div className="absolute -top-px left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
