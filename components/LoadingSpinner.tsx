'use client';

import { Loader as Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        <p className="text-slate-300 text-sm">Loading 3D Model...</p>
      </div>
    </div>
  );
}