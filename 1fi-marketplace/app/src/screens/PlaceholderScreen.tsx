import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

/** Lightweight placeholder for the secondary bottom-tab destinations. */
export function PlaceholderScreen(): React.JSX.Element {
  const route = useRoute();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.body}>
        <Text style={styles.title}>{route.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
