import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

interface SectionHeaderProps {
  label: string;
}

/** Small purple vertical bar + purple all-caps tracked-out label. */
export function SectionHeader({ label }: SectionHeaderProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <View style={styles.bar} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bar: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
