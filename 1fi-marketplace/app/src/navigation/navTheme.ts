import { DefaultTheme, type Theme } from '@react-navigation/native';
import { colors } from '../theme';

export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accent,
  },
};
