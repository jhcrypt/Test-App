'use client';

import { useState, useCallback } from 'react';
import { debounce } from '@/lib/utils';

interface TextInputSectionProps {
  defaultText?: string;
  onChange: (text: string) => void;
  onTransform: () => void;
  maxLength?: number;
  isProcessing?: boolean;
}

export function TextInputSection({
  defaultText = '',
  onChange,
  onTransform,
  maxLength = 10000,
  isProcessing = false,
}: TextInputSectionProps) {
  const [text, setText] = useState(defaultText);
  const [isFocused, setIsFocused] = useState(false);
  const [showFormats, setShowFormats] = useState(false);

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, 300),
    [onChange]
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
      debouncedOnChange(newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onTransform();
    }
  };

  const handleTransformClick = () => {
    if (!isProcessing && text.trim()) {
      onTransform();
    }
  };

  return (
    <div className="relative">
      {/* Format Examples Button */}
      <button
        onClick={() => setShowFormats(!showFormats)}
        className="absolute -top-10 right-0 text-sm text-gray-400 transition-colors hover:text-white"
      >
        {showFormats ? 'Hide Formats' : 'Show Formats'}
      </button>

      {/* Format Examples */}
      {showFormats && (
        <div className="absolute -top-36 left-0 right-0 animate-fade-in rounded-xl border border-white/10 bg-[#242424] p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="mb-2 text-xs font-medium text-purple-400">Natural Language:</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-400">"what's the difference between X and Y"</li>
                <li className="text-xs text-gray-400">"differences between X and Y"</li>
                <li className="text-xs text-gray-400">"comparing X and Y"</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-purple-400">Structured Format:</p>
              <ul className="space-y-1">
                <li className="text-xs text-gray-400">Subject1: description</li>
                <li className="text-xs text-gray-400">Subject2: description</li>
                <li className="text-xs text-gray-400">- Aspect: value1 vs value2</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Text Input */}
      <div
        className={`
        relative rounded-2xl transition-all duration-200
        ${isFocused ? 'shadow-lg shadow-purple-500/5' : 'shadow-md shadow-white/5'}
      `}
      >
        <textarea
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Example: what's the difference between whole and term life insurance"
          className={`
            h-32 w-full resize-none rounded-2xl bg-[#242424] p-6
            text-gray-100 placeholder-gray-500
            ring-purple-500/20 transition-all duration-200
            focus:outline-none focus:ring-2
            ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}
          `}
          disabled={isProcessing}
        />

        {/* Character Count */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`
            text-xs transition-colors duration-200
            ${text.length > maxLength * 0.9 ? 'text-red-400' : 'text-gray-500'}
          `}
          >
            {text.length}/{maxLength}
          </span>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <p>Press Enter to start new line</p>
        <p>Press Ctrl/⌘ + Enter to transform</p>
      </div>

      {/* Transform Button */}
      <button
        onClick={handleTransformClick}
        disabled={isProcessing || !text.trim()}
        className={`
          mt-6 w-full rounded-xl px-6 py-4
          text-sm font-medium transition-all duration-200
          ${
            isProcessing || !text.trim()
              ? 'cursor-not-allowed bg-gray-800 text-gray-500'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10'
          }
        `}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Transforming...
          </span>
        ) : (
          'Transform to Visual'
        )}
      </button>
    </div>
  );
}
