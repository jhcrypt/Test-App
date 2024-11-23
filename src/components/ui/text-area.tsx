'use client';

import * as React from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <textarea
        className={`
          w-full rounded-xl border-0
          bg-[#F8FAFC] px-4 py-3
          text-[15px] leading-relaxed
          text-gray-900 outline-none
          transition-all
          duration-200 placeholder:text-gray-400
          focus:ring-2 focus:ring-blue-100
          ${error ? 'ring-2 ring-red-100' : ''}
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

export { TextArea };
