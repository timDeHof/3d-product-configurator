import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3D Product Configurator | Interactive Design Studio',
  description: 'Professional 3D product configurator built with React, Three.js, and Next.js. Customize products in real-time with advanced 3D visualization.',
  keywords: '3D configurator, product customization, Three.js, React, interactive design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}