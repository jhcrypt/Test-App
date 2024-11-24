/**
 * @file: style-options.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

import { ColorTheme, TextSize } from '@/lib/types';

interface StyleOptionsProps {
  colorTheme: ColorTheme;
  textSize: TextSize;
  onColorThemeChange: (theme: ColorTheme) => void;
  onTextSizeChange: (size: TextSize) => void;
}

export function StyleOptions({
  colorTheme,
  textSize,
  onColorThemeChange,
  onTextSizeChange,
}: StyleOptionsProps) {
  const colorThemes: { value: ColorTheme; label: string; colors: string[] }[] = [
    {
      value: 'ocean',
      label: 'Ocean',
      colors: ['bg-blue-500', 'bg-green-500'],
    },
    {
      value: 'sunset',
      label: 'Sunset',
      colors: ['bg-purple-500', 'bg-orange-500'],
    },
    {
      value: 'monochrome',
      label: 'Monochrome',
      colors: ['bg-gray-400', 'bg-gray-600'],
    },
  ];

  const textSizes: { value: TextSize; label: string; preview: string }[] = [
    {
      value: 'compact',
      label: 'Compact',
      preview: 'text-sm',
    },
    {
      value: 'regular',
      label: 'Regular',
      preview: 'text-base',
    },
    {
      value: 'large',
      label: 'Large',
      preview: 'text-lg',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Color Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-200">Color Theme</label>
          <span className="text-xs text-gray-500">
            Choose a color scheme that enhances readability
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {colorThemes.map(theme => (
            <button
              key={theme.value}
              onClick={() => onColorThemeChange(theme.value)}
              className={`
                group relative rounded-xl p-4 text-sm transition-all
                hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20
                ${
                  colorTheme === theme.value
                    ? 'bg-[#2A2A2A] shadow-lg shadow-purple-500/5'
                    : 'bg-[#242424] hover:bg-[#282828]'
                }
              `}
            >
              <div className="space-y-3">
                {/* Color Preview */}
                <div
                  className={`
                  flex justify-center gap-2 rounded-lg p-3 transition-colors
                  ${
                    colorTheme === theme.value
                      ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                      : 'bg-[#2A2A2A] group-hover:bg-[#303030]'
                  }
                `}
                >
                  {theme.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`
                        h-6 w-6 rounded-full ${color} shadow-lg
                        transition-transform group-hover:scale-110
                      `}
                    />
                  ))}
                </div>

                {/* Label */}
                <p
                  className={`
                  text-center text-sm font-medium transition-colors
                  ${colorTheme === theme.value ? 'text-white' : 'text-gray-400'}
                `}
                >
                  {theme.label}
                </p>
              </div>

              {/* Selected Indicator */}
              {colorTheme === theme.value && (
                <div className="absolute -top-px left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Text Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-200">Text Size</label>
          <span className="text-xs text-gray-500">Adjust text size for optimal readability</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {textSizes.map(size => (
            <button
              key={size.value}
              onClick={() => onTextSizeChange(size.value)}
              className={`
                group relative rounded-xl p-4 transition-all
                hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20
                ${
                  textSize === size.value
                    ? 'bg-[#2A2A2A] shadow-lg shadow-purple-500/5'
                    : 'bg-[#242424] hover:bg-[#282828]'
                }
              `}
            >
              <div className="space-y-3">
                {/* Size Preview */}
                <div
                  className={`
                  flex h-12 items-center justify-center rounded-lg transition-colors
                  ${
                    textSize === size.value
                      ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                      : 'bg-[#2A2A2A] group-hover:bg-[#303030]'
                  }
                `}
                >
                  <span
                    className={`
                    ${size.preview}
                    ${textSize === size.value ? 'text-white' : 'text-gray-400'}
                    transition-transform group-hover:scale-110
                  `}
                  >
                    Aa
                  </span>
                </div>

                {/* Label */}
                <p
                  className={`
                  text-center text-sm font-medium transition-colors
                  ${textSize === size.value ? 'text-white' : 'text-gray-400'}
                `}
                >
                  {size.label}
                </p>
              </div>

              {/* Selected Indicator */}
              {textSize === size.value && (
                <div className="absolute -top-px left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
