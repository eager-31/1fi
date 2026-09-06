import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { cardShadow, colors, radii, spacing } from '../theme';
import { formatRupees } from '../lib/format';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  /** Largest no-cost EMI tenure, from the API. */
  noCostMonths: number;
  onPress: (product: Product) => void;
}

/**
 * White rounded card matching the brand-list pattern: square logo left,
 * bold name, grey subtitle line below.
 */
export function ProductCard({ product, noCostMonths, onPress }: ProductCardProps): React.JSX.Element {
  const image = product.images[0];
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress(product)}
      accessibilityRole="button"
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imageFallback]} />
      )}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          Starting {formatRupees(product.basePrice)} · No-cost EMI upto {noCostMonths} months
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.md,
    ...cardShadow,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  imageFallback: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },
});
