import React, { useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useProduct } from '../api/useProducts';
import { useEmiPlans } from '../api/useEmiPlans';
import { SectionHeader } from '../components/SectionHeader';
import { ProductDetailSkeleton } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { formatRupees } from '../lib/format';
import { colors, radii, spacing } from '../theme';
import type { ShopStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ShopStackParamList, 'OrderConfirmation'>;

export function OrderConfirmationScreen({ route, navigation }: Props): React.JSX.Element {
  const { productId, variantId, planId } = route.params;

  const productQuery = useProduct(productId);
  const emiQuery = useEmiPlans(productId);

  const product = productQuery.data;
  const variant = useMemo(
    () => product?.variants.find((v) => v.id === variantId),
    [product?.variants, variantId],
  );
  const plan = useMemo(
    () => emiQuery.data?.find((p) => p.id === planId),
    [emiQuery.data, planId],
  );

  const isLoading = productQuery.isLoading || emiQuery.isLoading;
  const isError = productQuery.isError || emiQuery.isError;

  const retry = useCallback(() => {
    void productQuery.refetch();
    void emiQuery.refetch();
  }, [productQuery, emiQuery]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.scrollBody}>
          <ProductDetailSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !product || !variant || !plan) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ErrorState
          title="Couldn't confirm your plan"
          onRetry={retry}
          retrying={productQuery.isRefetching || emiQuery.isRefetching}
        />
      </SafeAreaView>
    );
  }

  const effectivePrice = product.basePrice + variant.priceDelta;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Ionicons name="checkmark-circle" size={56} color={colors.primary} />
          <Text style={styles.heading}>Your plan is confirmed</Text>
          <Text style={styles.sub}>
            We'll set up your EMI and share the payment schedule shortly.
          </Text>
        </View>

        <View style={styles.card}>
          <SectionHeader label="Order summary" />
          <SummaryRow label={product.name} value={formatRupees(effectivePrice)} strong />
          <SummaryRow label="Variant" value={variant.label} />
          <SummaryRow label="Tenure" value={`${plan.tenureMonths} months`} />
          <SummaryRow label="Monthly" value={`${formatRupees(plan.monthlyAmount)}/mo`} />
          <SummaryRow
            label="Processing fee"
            value={plan.processingFee === 0 ? 'Waived' : formatRupees(plan.processingFee)}
          />
          <View style={styles.divider} />
          <SummaryRow label="Total payable" value={formatRupees(plan.totalPayable)} strong />
        </View>
      </ScrollView>

      <View style={styles.ctaBar}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => navigation.popToTop()}
          accessibilityRole="button"
        >
          <Text style={styles.ctaLabel}>Back to Shop</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, strong && styles.rowStrong]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.rowValue, strong && styles.rowStrong]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    padding: spacing.md,
    paddingBottom: 120,
    gap: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
  },
  rowValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  rowStrong: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaLabel: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '800',
  },
});
