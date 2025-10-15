'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Download, RotateCcw } from 'lucide-react';

export interface Settings {
  autoRotate: boolean;
  autoRotateSpeed: number;
  quality: 'low' | 'medium' | 'high';
  shadows: boolean;
  showGrid: boolean;
  reducedMotion: boolean;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onScreenshot: () => void;
  onResetCamera: () => void;
}

export function SettingsPanel({ 
  isOpen, 
  onClose, 
  settings, 
  onSettingsChange, 
  onScreenshot,
  onResetCamera 
}: SettingsPanelProps) {
  const updateSetting = (key: keyof Settings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center p-4 pt-20"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-sm bg-slate-800 border-slate-600 max-h-[60vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Settings</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Camera Controls */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-white">Camera</h3>
            
            <div className="flex items-center justify-between">
              <Label className="text-slate-200">Auto Rotate</Label>
              <Switch
                checked={settings.autoRotate}
                onCheckedChange={(checked) => updateSetting('autoRotate', checked)}
              />
            </div>

            {settings.autoRotate && (
              <div className="space-y-2">
                <Label className="text-slate-200">Rotation Speed</Label>
                <Slider
                  value={[settings.autoRotateSpeed]}
                  onValueChange={([value]) => updateSetting('autoRotateSpeed', value)}
                  max={5}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}

            <Button onClick={onResetCamera} variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Camera
            </Button>
          </div>

          {/* Rendering */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-white">Rendering</h3>
            
            <div className="space-y-2">
              <Label className="text-slate-200">Quality</Label>
              <Select
                value={settings.quality}
                onValueChange={(value: any) => updateSetting('quality', value)}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="low" className="text-white">Low</SelectItem>
                  <SelectItem value="medium" className="text-white">Medium</SelectItem>
                  <SelectItem value="high" className="text-white">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-slate-200">Shadows</Label>
              <Switch
                checked={settings.shadows}
                onCheckedChange={(checked) => updateSetting('shadows', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-slate-200">Show Grid</Label>
              <Switch
                checked={settings.showGrid}
                onCheckedChange={(checked) => updateSetting('showGrid', checked)}
              />
            </div>
          </div>

          {/* Accessibility */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-white">Accessibility</h3>
            
            <div className="flex items-center justify-between">
              <Label className="text-slate-200">Reduced Motion</Label>
              <Switch
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={onScreenshot} className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Take Screenshot
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}