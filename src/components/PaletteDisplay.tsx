
import React from 'react';
import ColorCard from './ColorCard';

interface PaletteDisplayProps {
  palette: Array<{ color: string; locked: boolean }>;
  onToggleLock: (index: number) => void;
  onCopyColor: (color: string) => void;
  onColorChange: (index: number, color: string) => void;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palette, onToggleLock, onCopyColor, onColorChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl">
      {palette.map((item, index) => (
        <ColorCard
          key={index}
          color={item.color}
          isLocked={item.locked}
          onToggleLock={() => onToggleLock(index)}
          onCopy={onCopyColor}
          onColorChange={(color) => onColorChange(index, color)}
        />
      ))}
    </div>
  );
};

export default PaletteDisplay;
