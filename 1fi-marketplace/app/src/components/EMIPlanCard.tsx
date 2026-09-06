import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme';
import { formatRupees } from '../lib/format';
import type { EMIPlan } from '../types';

interface EMIPlanCardProps {
  plan: EMIPlan;
  selected: boolean;
  onSelect: (planId: string) => void;
}

export function EMIPlanCard({ plan, selected, onSelect }: EMIPlanCardProps): React.JSX.Element {
  const noCost = plan.interestRatePct === 0;
  return (
    <Pressable
      onPress={() => onSelect(plan.id)}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={styles.header}>
        <View style={styles.tenureRow}>
          <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
          {noCost ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0% INTEREST</Text>
            </View>
          ) : (
            <Text style={styles.rate}>{plan.interestRatePct}% p.a.</Text>
          )}
        </View>
        <Ionicons
          name={selected ? 'radio-button-on' : 'radio-button-off'}
          size={20}
          color={selected ? colors.primary : colors.textSecondary}
        />
      </View>

      <Text style={styles.monthly}>
        {formatRupees(plan.monthlyAmount)}
        <Text style={styles.monthlySuffix}> / month</Text>
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          Processing fee {plan.processingFee === 0 ? 'waived' : formatRupees(plan.processingFee)}
        </Text>
        <Text style={styles.meta}>Total {formatRupees(plan.totalPayable)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tenureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tenure: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  rate: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  monthly: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  monthlySuffix: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
