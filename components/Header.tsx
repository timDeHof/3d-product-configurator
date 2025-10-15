'use client';

import { Palette, Layers3, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SettingsPanel, type Settings as SettingsType } from './SettingsPanel';

interface HeaderProps {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
  onScreenshot: () => void;
  onResetCamera: () => void;
}

export function Header({ settings, onSettingsChange, onScreenshot, onResetCamera }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers3 className="w-6 h-6 text-blue-400" />
            <h1 className="text-lg md:text-xl font-bold text-white">3D Product Studio</h1>
          </div>
          <div className="hidden lg:block text-sm text-slate-400">
            Interactive Product Configurator
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>3D Engine Active</span>
            </div>
          </div>

          <button 
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-slate-300" />
          </button>

          <button 
            className="md:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-4 h-4 text-slate-300" /> : <Menu className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>
      
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={onSettingsChange}
        onScreenshot={onScreenshot}
        onResetCamera={onResetCamera}
      />
    </header>
  );
}