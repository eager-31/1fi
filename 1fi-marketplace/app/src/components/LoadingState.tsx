import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';
import { cardShadow, colors, radii, spacing } from '../theme';

function useShimmer(): Animated.AnimatedInterpolation<string | number> {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(progress, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);
  return progress.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.9] });
}

function Shimmer({ style }: { style: ViewStyle | ViewStyle[] }): React.JSX.Element {
  const opacity = useShimmer();
  return <Animated.View style={[styles.block, style, { opacity }]} />;
}

/** Skeleton rows that mirror ProductCard — used instead of a spinner on the list screen. */
export function ProductListSkeleton({ rows = 5 }: { rows?: number }): React.JSX.Element {
  return (
    <View style={styles.list}>
      {Array.from({ length: rows }).map((_, index) => (
        <View key={index} style={styles.card}>
          <Shimmer style={styles.thumb} />
          <View style={styles.cardBody}>
            <Shimmer style={styles.lineWide} />
            <Shimmer style={styles.lineNarrow} />
          </View>
        </View>
      ))}
    </View>
  );
}

/** Skeleton that mirrors the product detail screen. */
export function ProductDetailSkeleton(): React.JSX.Element {
  return (
    <View style={styles.detail}>
      <Shimmer style={styles.hero} />
      <Shimmer style={styles.lineWide} />
      <Shimmer style={styles.lineNarrow} />
      <Shimmer style={styles.paragraph} />
      <View style={styles.chipRow}>
        <Shimmer style={styles.chip} />
        <Shimmer style={styles.chip} />
        <Shimmer style={styles.chip} />
      </View>
      <Shimmer style={styles.planBlock} />
      <Shimmer style={styles.planBlock} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.border,
    borderRadius: 8,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.md,
    ...cardShadow,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  cardBody: {
    flex: 1,
    gap: spacing.sm,
  },
  lineWide: {
    height: 14,
    width: '70%',
  },
  lineNarrow: {
    height: 12,
    width: '45%',
  },
  detail: {
    gap: spacing.md,
  },
  hero: {
    width: '100%',
    height: 260,
    borderRadius: radii.card,
  },
  paragraph: {
    height: 48,
    width: '100%',
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    height: 34,
    width: 84,
    borderRadius: radii.pill,
  },
  planBlock: {
    height: 96,
    width: '100%',
    borderRadius: radii.card,
  },
});
