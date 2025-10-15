'use client';

import { ProductConfig } from './ProductConfigurator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, RotateCcw, Palette } from 'lucide-react';

interface ConfigurationPanelProps {
  config: ProductConfig;
  onConfigChange: (config: ProductConfig) => void;
  onClose?: () => void;
}

const colorOptions = [
  { name: 'Red', value: '#ff6b6b', hex: '#ff6b6b' },
  { name: 'Blue', value: '#4dabf7', hex: '#4dabf7' },
  { name: 'Green', value: '#51cf66', hex: '#51cf66' },
  { name: 'Purple', value: '#9775fa', hex: '#9775fa' },
  { name: 'Orange', value: '#ff8c00', hex: '#ff8c00' },
  { name: 'Pink', value: '#ff69b4', hex: '#ff69b4' },
  { name: 'Yellow', value: '#ffd43b', hex: '#ffd43b' },
  { name: 'Black', value: '#343a40', hex: '#343a40' },
  { name: 'White', value: '#ffffff', hex: '#ffffff' },
  { name: 'Gray', value: '#868e96', hex: '#868e96' }
];

const frameMaterialOptions = [
  { name: 'Wood', value: 'wood' as const },
  { name: 'Metal', value: 'metal' as const },
  { name: 'Plastic', value: 'plastic' as const }
];

const cushionMaterialOptions = [
  { name: 'Leather', value: 'leather' as const },
  { name: 'Fabric', value: 'fabric' as const },
  { name: 'Denim', value: 'denim' as const },
  { name: 'Microfiber', value: 'microfiber' as const }
];

const pillowMaterialOptions = [
  { name: 'Fabric', value: 'fabric' as const },
  { name: 'Leather', value: 'leather' as const },
  { name: 'Denim', value: 'denim' as const },
  { name: 'Linen', value: 'linen' as const }
];

const environmentOptions = [
  { name: 'Studio', value: 'studio' as const },
  { name: 'Sunset', value: 'sunset' as const },
  { name: 'Forest', value: 'forest' as const },
  { name: 'Apartment', value: 'apartment' as const },
  { name: 'City', value: 'city' as const },
  { name: 'Dawn', value: 'dawn' as const },
  { name: 'Lobby', value: 'lobby' as const },
  { name: 'Park', value: 'park' as const },
  { name: 'Warehouse', value: 'warehouse' as const }
];

const sofaTypeOptions = [
  { name: 'Corner Sofa', value: 'corner' as const },
  { name: 'Two Seater', value: 'two-seater' as const }
];

export function ConfigurationPanel({ config, onConfigChange, onClose }: ConfigurationPanelProps) {
  const updateConfig = (updates: Partial<ProductConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const resetConfiguration = () => {
    onConfigChange({
      frameColor: '#8B4513',
      cushionColor: '#F5F5DC',
      pillowsColor: '#4A4A4A',
      frameMaterial: 'wood',
      cushionMaterial: 'denim',
      pillowMaterial: 'fabric',
      environment: 'studio',
      sofaType: 'corner'
    });
  };

  const ColorPicker = ({
    label,
    value,
    onChange
  }: {
    label: string;
    value: string;
    onChange: (color: string) => void;
  }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-200">{label}</Label>
      <div className="grid grid-cols-5 gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            className={`
              w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110
              ${value === color.value ? 'border-white ring-2 ring-blue-400' : 'border-slate-600'}
            `}
            style={{ backgroundColor: color.hex }}
            onClick={() => onChange(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-80 h-full bg-slate-800/95 backdrop-blur-sm border-l border-slate-700 p-4 md:p-6 overflow-y-auto pt-16 md:pt-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Customize</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Color Customization */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white mb-4">Colors</h3>

            <ColorPicker
              label="Frame"
              value={config.frameColor}
              onChange={(color) => updateConfig({ frameColor: color })}
            />

            <ColorPicker
              label="Cushions"
              value={config.cushionColor}
              onChange={(color) => updateConfig({ cushionColor: color })}
            />

            <ColorPicker
              label="Pillows"
              value={config.pillowsColor}
              onChange={(color) => updateConfig({ pillowsColor: color })}
            />
          </div>
        </Card>

        {/* Material Selection */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Materials</h3>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Frame Material</Label>
              <Select
                value={config.frameMaterial}
                onValueChange={(value: any) => updateConfig({ frameMaterial: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {frameMaterialOptions.map((material) => (
                    <SelectItem
                      key={material.value}
                      value={material.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Cushion Material</Label>
              <Select
                value={config.cushionMaterial}
                onValueChange={(value: any) => updateConfig({ cushionMaterial: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {cushionMaterialOptions.map((material) => (
                    <SelectItem
                      key={material.value}
                      value={material.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Pillow Material</Label>
              <Select
                value={config.pillowMaterial}
                onValueChange={(value: any) => updateConfig({ pillowMaterial: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {pillowMaterialOptions.map((material) => (
                    <SelectItem
                      key={material.value}
                      value={material.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Sofa Type */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Sofa Type</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Model</Label>
              <Select
                value={config.sofaType}
                onValueChange={(value: any) => updateConfig({ sofaType: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {sofaTypeOptions.map((sofa) => (
                    <SelectItem
                      key={sofa.value}
                      value={sofa.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {sofa.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Environment */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Environment</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Lighting</Label>
              <Select
                value={config.environment}
                onValueChange={(value: any) => updateConfig({ environment: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {environmentOptions.map((env) => (
                    <SelectItem
                      key={env.value}
                      value={env.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {env.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={resetConfiguration}
            variant="outline"
            className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Configuration
          </Button>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Configuration
          </Button>
        </div>

        {/* Configuration Summary */}
        <Card className="bg-slate-700/30 border-slate-600 p-4">
          <h4 className="text-sm font-medium text-slate-200 mb-2">Current Configuration</h4>
          <div className="text-xs text-slate-400 space-y-1">
            <div>Frame: {config.frameMaterial}</div>
            <div>Cushions: {config.cushionMaterial}</div>
            <div>Pillows: {config.pillowMaterial}</div>
            <div>Environment: {config.environment}</div>
            <div>Type: {config.sofaType}</div>
            <div>Frame: {config.frameColor}</div>
            <div>Cushions: {config.cushionColor}</div>
            <div>Pillows: {config.pillowsColor}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
