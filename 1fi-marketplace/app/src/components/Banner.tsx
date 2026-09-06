import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing } from '../theme';

interface BannerProps {
  /** Plain words of the headline. */
  headline: string;
  /** One word/phrase inside the headline rendered in the accent colour. */
  accentWord: string;
  /** Text after the accent word, optional. */
  headlineTail?: string;
  ctaLabel: string;
  onPressCta?: () => void;
}

/** Full-bleed purple gradient card with a bold white headline and a white CTA pill. */
export function Banner({
  headline,
  accentWord,
  headlineTail,
  ctaLabel,
  onPressCta,
}: BannerProps): React.JSX.Element {
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.headline}>
        {headline} <Text style={styles.accent}>{accentWord}</Text>
        {headlineTail ? ` ${headlineTail}` : ''}
      </Text>
      <View>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={onPressCta}
          accessibilityRole="button"
        >
          <Text style={styles.ctaLabel}>{ctaLabel}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.banner,
    padding: spacing.lg,
    gap: spacing.md,
  },
  headline: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 27,
  },
  accent: {
    color: colors.accent,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaLabel: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});
