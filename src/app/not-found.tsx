/**
 * @file: not-found.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="text-blue-500 hover:text-blue-600 transition-colors">
        Return to Home
      </a>
    </div>
  );
}
