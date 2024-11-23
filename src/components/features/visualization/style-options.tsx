'use client';

import { ColorScheme, FontSize } from '@/lib/types';

interface StyleOptionsProps {
  colorScheme: ColorScheme;
  fontSize: FontSize;
  onColorSchemeChange: (scheme: ColorScheme) => void;
  onFontSizeChange: (size: FontSize) => void;
}

export function StyleOptions({
  colorScheme,
  fontSize,
  onColorSchemeChange,
  onFontSizeChange,
}: StyleOptionsProps) {
  const colorSchemes: { value: ColorScheme; label: string; colors: string[] }[] = [
    {
      value: 'blue-green',
      label: 'Ocean',
      colors: ['bg-blue-500', 'bg-green-500'],
    },
    {
      value: 'purple-orange',
      label: 'Sunset',
      colors: ['bg-purple-500', 'bg-orange-500'],
    },
    {
      value: 'gray',
      label: 'Monochrome',
      colors: ['bg-gray-400', 'bg-gray-600'],
    },
  ];

  const fontSizes: { value: FontSize; label: string; preview: string }[] = [
    {
      value: 'small',
      label: 'Compact',
      preview: 'text-sm',
    },
    {
      value: 'medium',
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
          {colorSchemes.map(scheme => (
            <button
              key={scheme.value}
              onClick={() => onColorSchemeChange(scheme.value)}
              className={`
                group relative rounded-xl p-4 text-sm transition-all
                hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20
                ${
                  colorScheme === scheme.value
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
                    colorScheme === scheme.value
                      ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                      : 'bg-[#2A2A2A] group-hover:bg-[#303030]'
                  }
                `}
                >
                  {scheme.colors.map((color, index) => (
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
                  ${colorScheme === scheme.value ? 'text-white' : 'text-gray-400'}
                `}
                >
                  {scheme.label}
                </p>
              </div>

              {/* Selected Indicator */}
              {colorScheme === scheme.value && (
                <div className="absolute -top-px left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-200">Text Size</label>
          <span className="text-xs text-gray-500">Adjust text size for optimal readability</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {fontSizes.map(size => (
            <button
              key={size.value}
              onClick={() => onFontSizeChange(size.value)}
              className={`
                group relative rounded-xl p-4 transition-all
                hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20
                ${
                  fontSize === size.value
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
                    fontSize === size.value
                      ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                      : 'bg-[#2A2A2A] group-hover:bg-[#303030]'
                  }
                `}
                >
                  <span
                    className={`
                    ${size.preview}
                    ${fontSize === size.value ? 'text-white' : 'text-gray-400'}
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
                  ${fontSize === size.value ? 'text-white' : 'text-gray-400'}
                `}
                >
                  {size.label}
                </p>
              </div>

              {/* Selected Indicator */}
              {fontSize === size.value && (
                <div className="absolute -top-px left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
