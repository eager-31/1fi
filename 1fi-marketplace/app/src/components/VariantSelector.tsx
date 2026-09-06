import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../theme';
import type { Variant } from '../types';

interface VariantSelectorProps {
  variants: Variant[];
  selectedId: string | undefined;
  onSelect: (variantId: string) => void;
}

/** Horizontal chips. Out-of-stock variants render disabled. */
export function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {variants.map((variant) => {
        const active = variant.id === selectedId;
        const disabled = !variant.inStock;
        return (
          <Pressable
            key={variant.id}
            disabled={disabled}
            onPress={() => onSelect(variant.id)}
            style={[
              styles.chip,
              active && styles.chipActive,
              disabled && styles.chipDisabled,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: active, disabled }}
          >
            <Text style={[styles.label, active && styles.labelActive, disabled && styles.labelDisabled]}>
              {variant.label}
            </Text>
            {disabled ? <Text style={styles.oos}>Out of stock</Text> : null}
          </Pressable>
        );
      })}
      <View style={styles.endSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  chip: {
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: '#F1E9FC',
  },
  chipDisabled: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.primary,
  },
  labelDisabled: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  oos: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  endSpacer: {
    width: spacing.xs,
  },
});
