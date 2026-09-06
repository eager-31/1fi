export { colors, radii } from './colors';
export { spacing } from './spacing';

/** Shared soft card shadow so every list card lifts off the background consistently. */
export const cardShadow = {
  shadowColor: '#1A1A1A',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 2,
} as const;
