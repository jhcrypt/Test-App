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
