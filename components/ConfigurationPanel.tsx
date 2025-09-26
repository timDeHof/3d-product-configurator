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

const materialOptions = [
  { name: 'Leather', value: 'leather' as const },
  { name: 'Canvas', value: 'canvas' as const },
  { name: 'Mesh', value: 'mesh' as const }
];

const environmentOptions = [
  { name: 'Studio', value: 'studio' as const },
  { name: 'Sunset', value: 'sunset' as const },
  { name: 'Forest', value: 'forest' as const }
];

export function ConfigurationPanel({ config, onConfigChange }: ConfigurationPanelProps) {
  const updateConfig = (updates: Partial<ProductConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const resetConfiguration = () => {
    onConfigChange({
      upperColor: '#ff6b6b',
      soleColor: '#ffffff',
      lacesColor: '#333333',
      material: 'leather',
      environment: 'studio'
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
    <div className="w-80 h-full bg-slate-800/95 backdrop-blur-sm border-l border-slate-700 p-6 overflow-y-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Customize</h2>
        </div>

        {/* Color Customization */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white mb-4">Colors</h3>
            
            <ColorPicker
              label="Upper Material"
              value={config.upperColor}
              onChange={(color) => updateConfig({ upperColor: color })}
            />

            <ColorPicker
              label="Sole"
              value={config.soleColor}
              onChange={(color) => updateConfig({ soleColor: color })}
            />

            <ColorPicker
              label="Laces"
              value={config.lacesColor}
              onChange={(color) => updateConfig({ lacesColor: color })}
            />
          </div>
        </Card>

        {/* Material Selection */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Material</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Upper Material</Label>
              <Select 
                value={config.material} 
                onValueChange={(value: any) => updateConfig({ material: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {materialOptions.map((material) => (
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
            <div>Material: {config.material}</div>
            <div>Environment: {config.environment}</div>
            <div>Upper: {config.upperColor}</div>
            <div>Sole: {config.soleColor}</div>
            <div>Laces: {config.lacesColor}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}