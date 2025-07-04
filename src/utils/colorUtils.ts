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

export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const getRGB = (value: number) => {
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };

    return 0.2126 * getRGB(r) + 0.7152 * getRGB(g) + 0.0722 * getRGB(b);
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const getAccessibilityLevel = (ratio: number): { level: string; isAccessible: boolean } => {
  if (ratio >= 7) return { level: 'AAA', isAccessible: true };
  if (ratio >= 4.5) return { level: 'AA', isAccessible: true };
  if (ratio >= 3) return { level: 'AA Large', isAccessible: true };
  return { level: 'Fail', isAccessible: false };
};

export const isValidHexColor = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

export const expandHexColor = (hex: string): string => {
  if (hex.length === 4) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
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
