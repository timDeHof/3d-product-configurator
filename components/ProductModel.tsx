'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { ProductConfig } from './ProductConfigurator';

interface ProductModelProps {
  config: ProductConfig;
}

export function ProductModel({ config }: ProductModelProps) {
  const groupRef = useRef<Group>(null);

  // Material properties based on selected material
  const materialProps = useMemo(() => {
    switch (config.material) {
      case 'oak':
        return { color: '#deb887', roughness: 0.8, metalness: 0.1 };
      case 'walnut':
        return { color: '#8b4513', roughness: 0.7, metalness: 0.1 };
      case 'white':
        return { color: '#f8f9fa', roughness: 0.3, metalness: 0.0 };
      case 'black':
        return { color: '#212529', roughness: 0.3, metalness: 0.0 };
      default:
        return { color: '#deb887', roughness: 0.8, metalness: 0.1 };
    }
  }, [config.material]);

  // Calculate dimensions based on height and width
  const dimensions = useMemo(() => {
    const heightMultiplier = {
      small: 0.7,   // 4ft
      medium: 1.0,  // 6ft
      large: 1.2    // 7ft
    }[config.height];

    const widthMultiplier = {
      narrow: 0.7,
      standard: 1.0,
      wide: 1.4
    }[config.width];

    return {
      height: 4.0 * heightMultiplier,
      width: 2.5 * widthMultiplier,
      depth: 1.2,
      thickness: 0.08
    };
  }, [config.height, config.width]);

  // Door material properties
  const doorMaterial = useMemo(() => {
    if (config.doors === 'glass') {
      return { 
        color: '#ffffff', 
        roughness: 0.1, 
        metalness: 0.0, 
        transparent: true, 
        opacity: 0.3 
      };
    }
    return materialProps;
  }, [config.doors, materialProps]);

  // Accent color for doors/panels
  const accentMaterial = useMemo(() => ({
    color: config.accentColor,
    roughness: 0.4,
    metalness: 0.2
  }), [config.accentColor]);

  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
      {/* Main Frame - Left Side */}
      <mesh position={[-dimensions.width/2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.thickness, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Main Frame - Right Side */}
      <mesh position={[dimensions.width/2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.thickness, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Main Frame - Top */}
      <mesh position={[0, dimensions.height/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.width, dimensions.thickness, dimensions.depth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Main Frame - Bottom */}
      <mesh position={[0, -dimensions.height/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.width, dimensions.thickness, dimensions.depth]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Back Panel (if enabled) */}
      {config.backPanel && (
        <mesh position={[0, 0, -dimensions.depth/2 + dimensions.thickness/2]} castShadow receiveShadow>
          <boxGeometry args={[dimensions.width - dimensions.thickness, dimensions.height - dimensions.thickness, dimensions.thickness]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}

      {/* Adjustable Shelves */}
      {config.shelfPositions.map((position, index) => {
        const yPos = (position - 0.5) * (dimensions.height - dimensions.thickness);
        return (
          <mesh 
            key={index}
            position={[0, yPos, 0]} 
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[dimensions.width - dimensions.thickness * 2, dimensions.thickness, dimensions.depth - dimensions.thickness]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      })}

      {/* Doors (if enabled) */}
      {config.doors !== 'none' && (
        <>
          {/* Left Door */}
          <mesh 
            position={[-dimensions.width/4, -dimensions.height/4, dimensions.depth/2 - dimensions.thickness/2]} 
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[dimensions.width/2 - dimensions.thickness, dimensions.height/2 - dimensions.thickness, dimensions.thickness]} />
            <meshStandardMaterial {...doorMaterial} />
          </mesh>

          {/* Right Door */}
          <mesh 
            position={[dimensions.width/4, -dimensions.height/4, dimensions.depth/2 - dimensions.thickness/2]} 
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[dimensions.width/2 - dimensions.thickness, dimensions.height/2 - dimensions.thickness, dimensions.thickness]} />
            <meshStandardMaterial {...doorMaterial} />
          </mesh>

          {/* Door Handles */}
          <mesh position={[-dimensions.width/4 + 0.15, -dimensions.height/4, dimensions.depth/2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial {...accentMaterial} />
          </mesh>
          <mesh position={[dimensions.width/4 - 0.15, -dimensions.height/4, dimensions.depth/2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial {...accentMaterial} />
          </mesh>
        </>
      )}

      {/* Side Panel Accents (if no doors or accent color is different) */}
      {(config.doors === 'none' || config.accentColor !== materialProps.color) && (
        <>
          <mesh position={[-dimensions.width/2 - dimensions.thickness/2, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[dimensions.thickness/2, dimensions.height - dimensions.thickness, dimensions.depth - dimensions.thickness]} />
            <meshStandardMaterial {...accentMaterial} />
          </mesh>
          <mesh position={[dimensions.width/2 + dimensions.thickness/2, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[dimensions.thickness/2, dimensions.height - dimensions.thickness, dimensions.depth - dimensions.thickness]} />
            <meshStandardMaterial {...accentMaterial} />
          </mesh>
        </>
      )}

      {/* Base Support */}
      <mesh position={[0, -dimensions.height/2 - 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.width + 0.1, 0.1, dimensions.depth + 0.1]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}