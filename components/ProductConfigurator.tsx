'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { ConfigurationPanel } from './ConfigurationPanel';
import { ProductModel } from './ProductModel';
import { LoadingSpinner } from './LoadingSpinner';
import { Header } from './Header';

export interface ProductConfig {
  upperColor: string;
  soleColor: string;
  lacesColor: string;
  material: 'leather' | 'canvas' | 'mesh';
  environment: 'studio' | 'sunset' | 'forest';
}

export function ProductConfigurator() {
  const [config, setConfig] = useState<ProductConfig>({
    upperColor: '#ff6b6b',
    soleColor: '#ffffff',
    lacesColor: '#333333',
    material: 'leather',
    environment: 'studio'
  });

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Header />
      
      <div className="flex h-full">
        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <Canvas
            shadows
            camera={{ position: [0, 0, 4], fov: 50 }}
            gl={{ 
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance'
            }}
            onCreated={() => setIsLoading(false)}
          >
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 4]} />
              
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
                background={false}
              />
              
              {/* Camera Controls */}
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={8}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
                autoRotate={false}
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>
          
          {isLoading && <LoadingSpinner />}
        </div>
        
        {/* Configuration Panel */}
        <ConfigurationPanel 
          config={config}
          onConfigChange={setConfig}
        />
      </div>
    </div>
  );
}