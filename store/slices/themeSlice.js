import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const getInitialTheme = () => {
  return Appearance.getColorScheme() || 'light';
};

const initialState = {
  mode: 'system', // 'light', 'dark', or 'system'
  currentTheme: getInitialTheme(), // computed theme based on mode
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      if (action.payload === 'system') {
        const systemTheme = Appearance.getColorScheme();
        state.currentTheme = systemTheme || 'light';
      } else {
        state.currentTheme = action.payload;
      }
    },
    updateSystemTheme: (state, action) => {
      if (state.mode === 'system') {
        state.currentTheme = action.payload || 'light';
      }
    },
    toggleTheme: (state) => {
      if (state.mode === 'system') {
        // If system, toggle to opposite of current
        state.mode = state.currentTheme === 'light' ? 'dark' : 'light';
        state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      } else {
        // Toggle between light and dark
        const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        state.mode = newTheme;
        state.currentTheme = newTheme;
      }
    },
  },
});

export const { setThemeMode, updateSystemTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

