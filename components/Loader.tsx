'use client';

import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-white">
        <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
        <p className="text-sm font-medium">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}
