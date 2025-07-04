
import React, { useState, useEffect } from 'react';
import { Shuffle, Heart, Moon, Sun, Palette as PaletteIcon } from 'lucide-react';
import PaletteDisplay from '../components/PaletteDisplay';
import FavoritePalettes from '../components/FavoritePalettes';
import { generatePalette, saveFavoritePalette, getFavoritePalettes, removeFavoritePalette } from '../utils/colorUtils';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const [palette, setPalette] = useState<Array<{ color: string; locked: boolean }>>([]);
  const [favorites, setFavorites] = useState<Array<{ id: string; colors: string[]; createdAt: Date }>>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with a random palette
    const initialColors = generatePalette(5);
    setPalette(initialColors.map(color => ({ color, locked: false })));
    
    // Load favorites
    setFavorites(getFavoritePalettes());
    
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const generateNewPalette = () => {
    const newColors = generatePalette(5);
    setPalette(prevPalette => 
      prevPalette.map((item, index) => ({
        ...item,
        color: item.locked ? item.color : newColors[index]
      }))
    );
  };

  const toggleLock = (index: number) => {
    setPalette(prevPalette =>
      prevPalette.map((item, i) =>
        i === index ? { ...item, locked: !item.locked } : item
      )
    );
  };

  const handleCopyColor = (color: string) => {
    toast({
      title: "Color copied!",
      description: `${color.toUpperCase()} has been copied to your clipboard.`,
    });
  };

  const savePalette = () => {
    const colors = palette.map(item => item.color);
    saveFavoritePalette(colors);
    setFavorites(getFavoritePalettes());
    toast({
      title: "Palette saved!",
      description: "Your palette has been added to favorites.",
    });
  };

  const loadPalette = (colors: string[]) => {
    setPalette(colors.map(color => ({ color, locked: false })));
    setShowFavorites(false);
    toast({
      title: "Palette loaded!",
      description: "Your favorite palette has been loaded.",
    });
  };

  const removeFavorite = (id: string) => {
    removeFavoritePalette(id);
    setFavorites(getFavoritePalettes());
    toast({
      title: "Palette removed",
      description: "The palette has been removed from favorites.",
    });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PaletteIcon className="text-blue-600 dark:text-blue-400" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Color Palette Generator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Create beautiful color palettes for your next project. Click any color to copy its hex code, 
            lock colors you love, and save your favorite combinations.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={generateNewPalette}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Shuffle size={20} />
            Generate New Palette
          </button>
          
          <button
            onClick={savePalette}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Heart size={20} />
            Save Palette
          </button>
          
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Heart size={20} />
            {showFavorites ? 'Hide' : 'Show'} Favorites
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Current Palette */}
          <div className="flex justify-center">
            <PaletteDisplay
              palette={palette}
              onToggleLock={toggleLock}
              onCopyColor={handleCopyColor}
            />
          </div>

          {/* Instructions */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
              How to Use
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <p><strong>Click any color</strong> to copy its hex code to your clipboard</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <p><strong>Lock colors</strong> you like by clicking the lock icon</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <p><strong>Generate new palettes</strong> - locked colors stay the same</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <p><strong>Save favorite palettes</strong> and load them anytime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          {showFavorites && (
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <FavoritePalettes
                favorites={favorites}
                onLoadPalette={loadPalette}
                onRemoveFavorite={removeFavorite}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Made with ❤️ for designers and developers</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
