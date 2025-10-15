'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, Preload, Grid } from '@react-three/drei';
import { ConfigurationPanel } from './ConfigurationPanel';
import { ProductModel } from './ProductModel';
import { LoadingSpinner } from './LoadingSpinner';
import { Header } from './Header';
import { Footer } from './Footer';
import { type Settings } from './SettingsPanel';
import { AlertCircle } from 'lucide-react';

export interface ProductConfig {
  frameColor: string;
  cushionColor: string;
  pillowsColor: string;
  frameMaterial: 'wood' | 'metal' | 'plastic';
  cushionMaterial: 'leather' | 'fabric' | 'denim' | 'microfiber';
  pillowMaterial: 'fabric' | 'leather' | 'denim' | 'linen';
  environment: 'studio' | 'sunset' | 'forest' | 'apartment' | 'city' | 'dawn' | 'lobby' | 'park' | 'warehouse';
  sofaType: 'corner' | 'two-seater';
}

export function ProductConfigurator() {
  const [config, setConfig] = useState<ProductConfig>({
    frameColor: '#8B4513',
    cushionColor: '#F5F5DC',
    pillowsColor: '#4A4A4A',
    frameMaterial: 'wood',
    cushionMaterial: 'leather',
    pillowMaterial: 'fabric',
    environment: 'studio',
    sofaType: 'corner'
  });

  const [settings, setSettings] = useState<Settings>({
    autoRotate: false,
    autoRotateSpeed: 1,
    quality: 'high',
    shadows: true,
    showGrid: false,
    reducedMotion: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const controlsRef = useRef<any>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScreenshot = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'product-configuration.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const ErrorFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
      <div className="flex flex-col items-center gap-4 text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Failed to Load 3D Model</h3>
          <p className="text-slate-300 text-sm mb-4">There was an error loading the 3D model. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full">
      <Header
        settings={settings}
        onSettingsChange={setSettings}
        onScreenshot={handleScreenshot}
        onResetCamera={handleResetCamera}
      />
      <div className="flex h-[calc(100vh-1px)] relative">
        {/* 3D Viewport */}
        <div className={`transition-all duration-300 ${isPanelOpen ? 'flex-1' : 'w-full'} relative`}>
          <Canvas
            ref={canvasRef}
            shadows={settings.shadows}
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{
              antialias: settings.quality !== 'low',
              alpha: false,
              powerPreference: settings.quality === 'high' ? 'high-performance' : 'default'
            }}
            onCreated={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          >
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />

              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              {/* Product Model */}
              <ProductModel config={config} />

              {/* Ground and Shadows */}
              <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
                far={4.5}
              />

              {/* Environment */}
              <Environment
                preset={config.environment}
                background={true}
                backgroundBlurriness={0.8}
                backgroundIntensity={0.3}
              />

              {/* Grid */}
              {settings.showGrid && (
                <Grid
                  position={[0, -1.4, 0]}
                  args={[10, 10]}
                  cellSize={1}
                  cellThickness={0.5}
                  cellColor="#6366f1"
                  sectionSize={3}
                  sectionThickness={1}
                  sectionColor="#6366f1"
                  fadeDistance={25}
                  fadeStrength={1}
                />
              )}

              {/* Camera Controls */}
              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={12}
                minPolarAngle={Math.PI / 8}
                maxPolarAngle={Math.PI / 2}
                autoRotate={settings.autoRotate && !settings.reducedMotion}
                autoRotateSpeed={settings.autoRotateSpeed}
              />

              <Preload all />
            </Suspense>
          </Canvas>

          {isLoading && <LoadingSpinner />}
          {hasError && <ErrorFallback />}

          {/* Mobile Panel Toggle */}
          <button
            className="md:hidden absolute top-20 right-4 z-30 p-3 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-600"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            aria-label="Toggle configuration panel"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Configuration Panel */}
        <ConfigurationPanel
          config={config}
          onConfigChange={setConfig}
          isOpen={isPanelOpen}
          onToggle={() => setIsPanelOpen(!isPanelOpen)}
        />
      </div>
      <Footer />
    </div>
  );
}