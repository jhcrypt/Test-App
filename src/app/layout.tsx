/**
 * @file: layout.tsx
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to Visual Comparison',
  description: 'Transform text comparisons into visual representations',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen bg-[#1A1A1A] text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
