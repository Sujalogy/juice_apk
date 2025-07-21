// hooks/useColorScheme.js

import { useState, useEffect } from 'react';
import { Appearance } from 'react-native'; // Import Appearance for real color scheme

// A simplified mock for useColorScheme.
// In a real Expo project, you might use @expo/use-system-color-scheme
// or a more robust solution.
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  return colorScheme; // 'light' or 'dark'
}
