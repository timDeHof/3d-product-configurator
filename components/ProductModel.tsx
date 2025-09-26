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
  const upperRef = useRef<Mesh>(null);
  const soleRef = useRef<Mesh>(null);
  const lacesRef = useRef<Mesh>(null);

  // Create materials based on configuration
  const materials = useMemo(() => {
    const getTexture = (material: string) => {
      switch (material) {
        case 'leather':
          return { roughness: 0.3, metalness: 0.1 };
        case 'canvas':
          return { roughness: 0.8, metalness: 0.0 };
        case 'mesh':
          return { roughness: 0.6, metalness: 0.0 };
        default:
          return { roughness: 0.5, metalness: 0.0 };
      }
    };

    const textureProps = getTexture(config.material);

    return {
      upper: {
        color: config.upperColor,
        ...textureProps
      },
      sole: {
        color: config.soleColor,
        roughness: 0.7,
        metalness: 0.0
      },
      laces: {
        color: config.lacesColor,
        roughness: 0.9,
        metalness: 0.0
      }
    };
  }, [config]);

  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.5}>
      {/* Shoe Upper */}
      <mesh ref={upperRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 0.8]} />
        <meshStandardMaterial 
          {...materials.upper}
          transparent={false}
        />
      </mesh>

      {/* Shoe Sole */}
      <mesh ref={soleRef} position={[0, -0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.4, 1]} />
        <meshStandardMaterial 
          {...materials.sole}
          transparent={false}
        />
      </mesh>

      {/* Laces */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i} 
          ref={i === 0 ? lacesRef : undefined}
          position={[0, 0.3 - i * 0.15, 0.41]} 
          castShadow
        >
          <boxGeometry args={[1.5, 0.05, 0.05]} />
          <meshStandardMaterial 
            {...materials.laces}
            transparent={false}
          />
        </mesh>
      ))}

      {/* Shoe Details */}
      <mesh position={[-0.8, 0, 0.41]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.02]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0.8, 0, 0.41]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.02]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}