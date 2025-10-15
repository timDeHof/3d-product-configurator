'use client';

import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 px-4 py-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>3D Product Configurator</span>
          <span className="hidden md:inline">Built with React, Three.js & Next.js</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Corner Sofa by</span>
          <a 
            href="https://sketchfab.com/algur" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            Algur (Sketchfab)
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}