'use client';

import { Palette, Layers3, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers3 className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">3D Product Studio</h1>
          </div>
          <div className="hidden md:block text-sm text-slate-400">
            Interactive Product Configurator
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>3D Engine Active</span>
            </div>
          </div>
          
          <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors">
            <Settings className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
}