'use client';

import { ProductConfigurator } from '@/components/ProductConfigurator';

export default function Home() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ProductConfigurator />
    </div>
  );
}