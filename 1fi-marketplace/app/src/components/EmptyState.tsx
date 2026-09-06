import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
}

export function EmptyState({
  title,
  message,
  icon = 'search-outline',
}: EmptyStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={36} color={colors.textSecondary} />
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
