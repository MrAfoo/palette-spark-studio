
import React, { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { isValidHexColor, expandHexColor, getContrastRatio, getAccessibilityLevel } from '../utils/colorUtils';

interface ColorInputProps {
  color: string;
  onColorChange: (color: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ color, onColorChange }) => {
  const [inputValue, setInputValue] = useState(color);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    const normalizedValue = inputValue.startsWith('#') ? inputValue : `#${inputValue}`;
    const expandedColor = expandHexColor(normalizedValue);
    
    if (isValidHexColor(expandedColor)) {
      onColorChange(expandedColor.toUpperCase());
      setInputValue(expandedColor.toUpperCase());
    } else {
      setInputValue(color);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setInputValue(color);
      setIsEditing(false);
    }
  };

  const contrastWithWhite = getContrastRatio(color, '#FFFFFF');
  const contrastWithBlack = getContrastRatio(color, '#000000');
  const whiteAccessibility = getAccessibilityLevel(contrastWithWhite);
  const blackAccessibility = getAccessibilityLevel(contrastWithBlack);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleSubmit}
              className="font-mono text-sm px-2 py-1 border rounded w-20 dark:bg-gray-700 dark:border-gray-600"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => {
                setInputValue(color);
                setIsEditing(false);
              }}
              className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <span
            className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setIsEditing(true)}
          >
            {color.toUpperCase()}
          </span>
        )}
      </div>
      
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">vs White:</span>
          <span className={`px-1 rounded ${whiteAccessibility.isAccessible ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
            {whiteAccessibility.level}
          </span>
          <span className="text-gray-500">{contrastWithWhite.toFixed(1)}:1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">vs Black:</span>
          <span className={`px-1 rounded ${blackAccessibility.isAccessible ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
            {blackAccessibility.level}
          </span>
          <span className="text-gray-500">{contrastWithBlack.toFixed(1)}:1</span>
        </div>
        {!whiteAccessibility.isAccessible && !blackAccessibility.isAccessible && (
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <AlertTriangle size={12} />
            <span>Poor contrast</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorInput;
