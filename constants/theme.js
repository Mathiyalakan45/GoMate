import { Platform } from 'react-native';

// "Deep Space Rainbow" palette - Inspired by premium color analysis apps
const tintColorLight = '#A855F7'; // Purple-500
const tintColorDark = '#C084FC';  // Purple-400 (Neon glow)

export const Colors = {
  light: {
    text: '#1E1B4B', // Indigo-950 (Deep purple-tinted black)
    subtext: '#6B7280', // Gray-500
    background: '#F9FAFB', // Gray-50
    card: '#FFFFFF', // White cards
    tint: tintColorLight,
    icon: '#9CA3AF', // Gray-400
    tabIconDefault: '#D1D5DB', // Gray-300
    tabIconSelected: tintColorLight,
    border: '#E5E7EB', // Gray-200
    success: '#10B981', // Emerald-500
    warning: '#F59E0B', // Amber-500
    error: '#EF4444', // Red-500
    highlight: '#F5F3FF', // Purple-50
    accent: '#EC4899', // Pink-500
    // Rainbow gradient colors for special elements
    rainbow: {
      red: '#EF4444',
      orange: '#F97316',
      yellow: '#EAB308',
      green: '#22C55E',
      cyan: '#06B6D4',
      blue: '#3B82F6',
      purple: '#A855F7',
      pink: '#EC4899',
    }
  },
  dark: {
    text: '#F9FAFB', // Gray-50 (Crisp white)
    subtext: '#9CA3AF', // Gray-400
    background: '#0F0A1F', // Deep space navy (custom)
    card: '#1A1433', // Rich dark purple (custom)
    tint: tintColorDark,
    icon: '#6B7280', // Gray-500
    tabIconDefault: '#4B5563', // Gray-600
    tabIconSelected: tintColorDark,
    border: '#312E81', // Indigo-900 (Subtle purple border)
    success: '#34D399', // Emerald-400
    warning: '#FBBF24', // Amber-400
    error: '#F87171', // Red-400
    highlight: '#1E1B4B', // Indigo-950 (Deep highlight)
    accent: '#F472B6', // Pink-400 (Bright neon pink)
    // Rainbow gradient colors (brighter for dark mode)
    rainbow: {
      red: '#F87171',
      orange: '#FB923C',
      yellow: '#FCD34D',
      green: '#4ADE80',
      cyan: '#22D3EE',
      blue: '#60A5FA',
      purple: '#C084FC',
      pink: '#F472B6',
    }
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});