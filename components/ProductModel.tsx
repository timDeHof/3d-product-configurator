'use client';

import { ProductConfig } from './ProductConfigurator';
import { Model as CornerSofa } from './3d-models/sofa-corner';
import { Model as TwoSeaterSofa } from './3d-models/sofa-two-seater';

interface ProductModelProps {
  config: ProductConfig;
}

export function ProductModel({ config }: ProductModelProps) {
  return (
    <group position={[-1.125, -1, 0]} scale={1.125} rotation={[0, - Math.PI / 2, 0]}>
      {config.sofaType === 'corner' ? (
        <CornerSofa config={config} />
      ) : (
        <TwoSeaterSofa config={config} />
      )}
    </group>
  );
}
