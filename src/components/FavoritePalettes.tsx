
import React from 'react';
import { Trash2, Heart } from 'lucide-react';

interface FavoritePalettesProps {
  favorites: Array<{ id: string; colors: string[]; createdAt: Date }>;
  onLoadPalette: (colors: string[]) => void;
  onRemoveFavorite: (id: string) => void;
}

const FavoritePalettes: React.FC<FavoritePalettesProps> = ({ 
  favorites, 
  onLoadPalette, 
  onRemoveFavorite 
}) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="mx-auto text-gray-400 dark:text-gray-600 mb-2" size={48} />
        <p className="text-gray-500 dark:text-gray-400">No favorite palettes yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Generate a palette and save it to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Favorite Palettes ({favorites.length})
      </h3>
      <div className="grid gap-4">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(favorite.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => onRemoveFavorite(favorite.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <Trash2 className="text-red-500" size={16} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-3">
              {favorite.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <button
              onClick={() => onLoadPalette(favorite.colors)}
              className="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Load Palette
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePalettes;
