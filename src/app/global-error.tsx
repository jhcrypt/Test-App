/**
 * @file: global-error.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#1A1A1A] text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Something went wrong!</h1>
          <p className="text-gray-400">
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-[1.02] transition-transform"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
