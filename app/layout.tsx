import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3D Product Configurator | Interactive Design Studio',
  description: 'Professional 3D product configurator built with React, Three.js, and Next.js. Customize products in real-time with advanced 3D visualization.',
  keywords: '3D configurator, product customization, Three.js, React, interactive design',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className='min-h-[calc(100vh-1px)] flex flex-col font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 antialiased'>
        <main className="relative h-full w-full overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
