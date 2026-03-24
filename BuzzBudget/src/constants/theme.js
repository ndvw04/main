export const COLORS = {
  // Primary - Penn State inspired dark nightlife theme
  primary: '#1e3a5f',       // Deep navy blue
  primaryLight: '#2d5a8e',  // Lighter navy
  accent: '#e89b3e',        // Warm gold/amber (neon bar feel)
  accentLight: '#f5c06d',   // Light gold

  // Backgrounds
  background: '#0a0e1a',    // Very dark blue-black
  card: '#141928',          // Dark card background
  cardLight: '#1c2235',     // Slightly lighter card

  // Text
  text: '#ffffff',
  textSecondary: '#8e95a8',
  textMuted: '#555d73',

  // Status colors
  open: '#4ade80',          // Green for "open now"
  closed: '#f87171',        // Red for "closed"
  happy: '#facc15',         // Yellow for happy hour

  // Gradients
  gradientStart: '#1e3a5f',
  gradientEnd: '#0a0e1a',

  // UI
  border: '#1f2740',
  tabBar: '#0d1120',
  overlay: 'rgba(10, 14, 26, 0.85)',
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Font sizes
  caption: 11,
  body: 14,
  bodyLarge: 16,
  subtitle: 18,
  title: 22,
  header: 28,
  hero: 36,

  // Border radius
  radius: 12,
  radiusLg: 20,
  radiusFull: 999,

  // Icons
  icon: 24,
  iconLg: 32,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  glow: {
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
};
