import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateSystemTheme } from '@/store/slices/themeSlice';

export function useColorScheme() {
  const dispatch = useAppDispatch();
  const { currentTheme, mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (mode === 'system') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        dispatch(updateSystemTheme(colorScheme));
      });

      // Update initial system theme
      dispatch(updateSystemTheme(Appearance.getColorScheme()));

      return () => subscription.remove();
    }
  }, [mode, dispatch]);

  return currentTheme;
}
