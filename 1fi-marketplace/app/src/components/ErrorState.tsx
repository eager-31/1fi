import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  retrying?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this right now.',
  onRetry,
  retrying = false,
}: ErrorStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={40} color={colors.textSecondary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onRetry}
        disabled={retrying}
        accessibilityRole="button"
      >
        <Text style={styles.buttonLabel}>{retrying ? 'Retrying…' : 'Try again'}</Text>
      </Pressable>
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '700',
  },
});
