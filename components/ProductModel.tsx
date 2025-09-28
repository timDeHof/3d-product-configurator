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
  const seatRef = useRef<Mesh>(null);
  const backrestRef = useRef<Mesh>(null);
  const legsRef = useRef<Mesh>(null);

  // Create materials and dimensions based on configuration
  const materials = useMemo(() => {
    return {
      seat: {
        color: config.seatColor,
        roughness: 0.4,
        metalness: 0.1
      },
      backrest: {
        color: config.backrestColor,
        roughness: 0.4,
        metalness: 0.1
      },
      legs: {
        color: config.legsColor,
        roughness: 0.2,
        metalness: 0.8
      }
    };
  }, [config.seatColor, config.backrestColor, config.legsColor]);

  // Calculate dimensions based on width
  const dimensions = useMemo(() => {
    const widthMultiplier = {
      narrow: 0.8,
      standard: 1.0,
      wide: 1.3
    }[config.width];

    return {
      seatWidth: 2.0 * widthMultiplier,
      seatDepth: 1.8,
      seatHeight: 0.15,
      backrestWidth: 2.0 * widthMultiplier,
      backrestHeight: 2.0,
      backrestThickness: 0.1
    };
  }, [config.width]);

  // Get leg geometry based on design
  const getLegGeometry = (legDesign: string) => {
    switch (legDesign) {
      case 'modern':
        return { args: [0.05, 1.5, 0.05] as [number, number, number], shape: 'box' };
      case 'classic':
        return { args: [0.08, 1.5, 32] as [number, number, number], shape: 'cylinder' };
      case 'industrial':
        return { args: [0.06, 1.5, 0.06] as [number, number, number], shape: 'box' };
      default:
        return { args: [0.05, 1.5, 0.05] as [number, number, number], shape: 'box' };
    }
  };

  const legGeometry = useMemo(() => getLegGeometry(config.legDesign), [config.legDesign]);

  // Get leg material properties based on design
  const legMaterialProps = useMemo(() => {
    switch (config.legDesign) {
      case 'modern':
        return { roughness: 0.1, metalness: 0.9 };
      case 'classic':
        return { roughness: 0.6, metalness: 0.2 };
      case 'industrial':
        return { roughness: 0.3, metalness: 0.7 };
      default:
        return { roughness: 0.2, metalness: 0.8 };
    }
  }, [config.legDesign]);

  const finalLegMaterial = useMemo(() => ({
    ...materials.legs,
    ...legMaterialProps
  }), [materials.legs, legMaterialProps]);

  // Leg positions based on seat width
  const legPositions = useMemo(() => {
    const halfWidth = dimensions.seatWidth / 2 - 0.1;
    const halfDepth = dimensions.seatDepth / 2 - 0.1;
    return [
      [-halfWidth, -0.75, halfDepth],   // front left
      [halfWidth, -0.75, halfDepth],    // front right
      [-halfWidth, -0.75, -halfDepth],  // back left
      [halfWidth, -0.75, -halfDepth]    // back right
    ];
  }, [dimensions.seatWidth, dimensions.seatDepth]);

  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Chair Seat */}
      <mesh ref={seatRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[dimensions.seatWidth, dimensions.seatHeight, dimensions.seatDepth]} />
        <meshStandardMaterial 
          {...materials.seat}
          transparent={false}
        />
      </mesh>

      {/* Chair Backrest */}
      <mesh 
        ref={backrestRef} 
        position={[0, 1.0, -dimensions.seatDepth/2 + dimensions.backrestThickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[dimensions.backrestWidth, dimensions.backrestHeight, dimensions.backrestThickness]} />
        <meshStandardMaterial 
          {...materials.backrest}
          transparent={false}
        />
      </mesh>

      {/* Chair Legs */}
      {legPositions.map((position, i) => (
        <mesh 
          key={i}
          ref={i === 0 ? legsRef : undefined}
          position={position as [number, number, number]}
          castShadow
        >
          {legGeometry.shape === 'cylinder' ? (
            <cylinderGeometry args={legGeometry.args as [number, number, number]} />
          ) : (
            <boxGeometry args={legGeometry.args} />
          )}
          <meshStandardMaterial 
            {...finalLegMaterial}
            transparent={false}
          />
        </mesh>
      ))}

      {/* Seat Cushion Detail */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[dimensions.seatWidth - 0.1, 0.05, dimensions.seatDepth - 0.1]} />
        <meshStandardMaterial 
          color={config.seatColor}
          roughness={0.6}
        />
      </mesh>

      {/* Backrest Cushion Detail */}
      <mesh 
        position={[0, 1.0, -dimensions.seatDepth/2 + 0.08]} 
        castShadow
      >
        <boxGeometry args={[dimensions.backrestWidth - 0.1, dimensions.backrestHeight - 0.1, 0.05]} />
        <meshStandardMaterial 
          color={config.backrestColor}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}