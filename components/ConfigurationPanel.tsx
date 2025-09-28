'use client';

import { ProductConfig } from './ProductConfigurator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, RotateCcw, BookOpen, Move } from 'lucide-react';

interface ConfigurationPanelProps {
  config: ProductConfig;
  onConfigChange: (config: ProductConfig) => void;
}

const colorOptions = [
  { name: 'Red', value: '#dc2626', hex: '#dc2626' },
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

const heightOptions = [
  { name: 'Small (4ft)', value: 'small' as const },
  { name: 'Medium (6ft)', value: 'medium' as const },
  { name: 'Large (7ft)', value: 'large' as const }
];

const materialOptions = [
  { name: 'Oak', value: 'oak' as const },
  { name: 'Walnut', value: 'walnut' as const },
  { name: 'White Painted', value: 'white' as const },
  { name: 'Black Painted', value: 'black' as const }
];

const widthOptions = [
  { name: 'Narrow', value: 'narrow' as const },
  { name: 'Standard', value: 'standard' as const },
  { name: 'Wide', value: 'wide' as const }
];

const doorOptions = [
  { name: 'No Doors', value: 'none' as const },
  { name: 'Glass Doors', value: 'glass' as const },
  { name: 'Wooden Doors', value: 'wooden' as const }
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
      height: 'medium',
      width: 'standard',
      shelves: 5,
      shelfPositions: [0.2, 0.4, 0.6, 0.8, 1.0],
      material: 'oak',
      backPanel: true,
      doors: 'none',
      accentColor: '#4dabf7',
      environment: 'studio'
    });
  };

  const updateShelfCount = (count: number) => {
    const newPositions = Array.from({ length: count }, (_, i) => 
      (i + 1) / (count + 1)
    );
    updateConfig({ shelves: count, shelfPositions: newPositions });
  };

  const updateShelfPosition = (index: number, position: number) => {
    const newPositions = [...config.shelfPositions];
    newPositions[index] = position;
    updateConfig({ shelfPositions: newPositions });
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
          <BookOpen className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Customize</h2>
        </div>

        {/* Dimensions */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white mb-4">Dimensions</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Height</Label>
              <Select 
                value={config.height} 
                onValueChange={(value: any) => updateConfig({ height: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {heightOptions.map((height) => (
                    <SelectItem 
                      key={height.value} 
                      value={height.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {height.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Width</Label>
              <Select 
                value={config.width} 
                onValueChange={(value: any) => updateConfig({ width: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {widthOptions.map((width) => (
                    <SelectItem 
                      key={width.value} 
                      value={width.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {width.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Shelves Configuration */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Shelves</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">
                Number of Shelves: {config.shelves}
              </Label>
              <Slider
                value={[config.shelves]}
                onValueChange={([value]) => updateShelfCount(value)}
                min={3}
                max={8}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-slate-400" />
                <Label className="text-sm font-medium text-slate-200">Shelf Positions</Label>
              </div>
              {config.shelfPositions.map((position, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Shelf {index + 1}</span>
                    <span>{Math.round(position * 100)}%</span>
                  </div>
                  <Slider
                    value={[position]}
                    onValueChange={([value]) => updateShelfPosition(index, value)}
                    min={0.1}
                    max={0.95}
                    step={0.05}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Material & Finish */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Material & Finish</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Material</Label>
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

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-200">Accent Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110
                      ${config.accentColor === color.value ? 'border-white ring-2 ring-blue-400' : 'border-slate-600'}
                    `}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => updateConfig({ accentColor: color.value })}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Structure Options */}
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Structure</h3>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-200">Back Panel</Label>
              <Switch
                checked={config.backPanel}
                onCheckedChange={(checked) => updateConfig({ backPanel: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Door Options</Label>
              <Select 
                value={config.doors} 
                onValueChange={(value: any) => updateConfig({ doors: value })}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {doorOptions.map((door) => (
                    <SelectItem 
                      key={door.value} 
                      value={door.value}
                      className="text-white hover:bg-slate-600"
                    >
                      {door.name}
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
            <div>Height: {config.height}</div>
            <div>Width: {config.width}</div>
            <div>Shelves: {config.shelves}</div>
            <div>Material: {config.material}</div>
            <div>Back Panel: {config.backPanel ? 'Yes' : 'No'}</div>
            <div>Doors: {config.doors}</div>
            <div>Environment: {config.environment}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}