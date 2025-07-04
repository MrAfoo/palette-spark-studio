
export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generatePalette = (size: number = 5): string[] => {
  const palette = [];
  for (let i = 0; i < size; i++) {
    palette.push(generateRandomColor());
  }
  return palette;
};

export const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export const saveFavoritePalette = (colors: string[]): void => {
  const favorites = getFavoritePalettes();
  const newFavorite = {
    id: Date.now().toString(),
    colors,
    createdAt: new Date()
  };
  const updatedFavorites = [newFavorite, ...favorites].slice(0, 20); // Keep only 20 favorites
  localStorage.setItem('favoritePalettes', JSON.stringify(updatedFavorites));
};

export const getFavoritePalettes = (): Array<{ id: string; colors: string[]; createdAt: Date }> => {
  try {
    const stored = localStorage.getItem('favoritePalettes');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    }
  } catch (error) {
    console.error('Error loading favorite palettes:', error);
  }
  return [];
};

export const removeFavoritePalette = (id: string): void => {
  const favorites = getFavoritePalettes();
  const updatedFavorites = favorites.filter(fav => fav.id !== id);
  localStorage.setItem('favoritePalettes', JSON.stringify(updatedFavorites));
};
