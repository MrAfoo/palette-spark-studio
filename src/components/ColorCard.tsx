
import React, { useState } from 'react';
import { Copy, Lock, Unlock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import ColorInput from './ColorInput';

interface ColorCardProps {
  color: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onCopy: (color: string) => void;
  onColorChange: (color: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, isLocked, onToggleLock, onCopy, onColorChange }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      onCopy(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy color to clipboard');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="h-32 w-full cursor-pointer relative"
            style={{ backgroundColor: color }}
            onClick={handleCopy}
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <Copy className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock();
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  {isLocked ? (
                    <Lock className="text-white" size={16} />
                  ) : (
                    <Unlock className="text-white opacity-70" size={16} />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isLocked ? 'Unlock color' : 'Lock color'}
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Click to copy {color.toUpperCase()}
        </TooltipContent>
      </Tooltip>
      
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <ColorInput color={color} onColorChange={onColorChange} />
          {copied && (
            <span className="text-xs text-green-600 dark:text-green-400 animate-fade-in">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
