import React, { useCallback, useEffect, useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useProduct } from '../api/useProducts';
import { useEmiPlans } from '../api/useEmiPlans';
import {
  useMarketplaceStore,
  useSelectedPlanId,
  useSelectedVariantId,
} from '../store/marketplaceStore';
import { SectionHeader } from '../components/SectionHeader';
import { VariantSelector } from '../components/VariantSelector';
import { EMIPlanCard } from '../components/EMIPlanCard';
import { ProductDetailSkeleton } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { formatRupees } from '../lib/format';
import { colors, radii, spacing } from '../theme';
import type { ShopStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props): React.JSX.Element {
  const { productId } = route.params;

  const productQuery = useProduct(productId);
  const emiQuery = useEmiPlans(productId);

  const selectedVariantId = useSelectedVariantId(productId);
  const selectedPlanId = useSelectedPlanId(productId);
  const selectVariant = useMarketplaceStore((s) => s.selectVariant);
  const selectPlan = useMarketplaceStore((s) => s.selectPlan);

  const product = productQuery.data;

  useEffect(() => {
    navigation.setOptions({ title: product?.name ?? '' });
  }, [navigation, product?.name]);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId),
    [product?.variants, selectedVariantId],
  );
  const selectedPlan = useMemo(
    () => emiQuery.data?.find((p) => p.id === selectedPlanId),
    [emiQuery.data, selectedPlanId],
  );

  const effectivePrice = product
    ? product.basePrice + (selectedVariant?.priceDelta ?? 0)
    : 0;

  const canProceed = Boolean(product && selectedVariant && selectedPlan);

  const handleProceed = useCallback(() => {
    if (!product || !selectedVariant || !selectedPlan) return;
    navigation.navigate('OrderConfirmation', {
      productId: product.id,
      variantId: selectedVariant.id,
      planId: selectedPlan.id,
    });
  }, [navigation, product, selectedVariant, selectedPlan]);

  const isLoading = productQuery.isLoading || emiQuery.isLoading;
  const isError = productQuery.isError || emiQuery.isError;

  const retry = useCallback(() => {
    if (productQuery.isError) void productQuery.refetch();
    if (emiQuery.isError) void emiQuery.refetch();
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

  if (isError || !product) {
    const err = productQuery.error ?? emiQuery.error;
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ErrorState
          title="Couldn't load this product"
          message={err instanceof Error ? err.message : undefined}
          onRetry={retry}
          retrying={productQuery.isRefetching || emiQuery.isRefetching}
        />
      </SafeAreaView>
    );
  }

  const image = product.images[0];
  const plans = emiQuery.data ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {image ? (
          <Image source={{ uri: image }} style={styles.hero} resizeMode="cover" />
        ) : (
          <View style={[styles.hero, styles.heroFallback]} />
        )}

        <View style={styles.headingBlock}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>
            {formatRupees(effectivePrice)}
            {selectedVariant ? null : <Text style={styles.priceHint}>  onwards</Text>}
          </Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.section}>
          <SectionHeader label="Choose a variant" />
          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariantId}
            onSelect={(variantId) => selectVariant(product.id, variantId)}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader label="EMI plans" />
          {plans.length === 0 ? (
            <Text style={styles.description}>No EMI plans available for this product.</Text>
          ) : (
            <View style={styles.planList}>
              {plans.map((plan) => (
                <EMIPlanCard
                  key={plan.id}
                  plan={plan}
                  selected={plan.id === selectedPlanId}
                  onSelect={(planId) => selectPlan(product.id, planId)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.ctaBar}>
        {!canProceed ? (
          <Text style={styles.ctaHint}>
            {selectedVariant ? 'Select an EMI plan to continue' : 'Select a variant to continue'}
          </Text>
        ) : (
          <Text style={styles.ctaHint}>
            {selectedPlan ? `${formatRupees(selectedPlan.monthlyAmount)}/mo · ${selectedPlan.tenureMonths} months` : ''}
          </Text>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            !canProceed && styles.ctaDisabled,
            pressed && canProceed && styles.ctaPressed,
          ]}
          onPress={handleProceed}
          disabled={!canProceed}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canProceed }}
        >
          <Text style={styles.ctaLabel}>Proceed</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    padding: spacing.md,
    paddingBottom: 140,
    gap: spacing.md,
  },
  hero: {
    width: '100%',
    height: 260,
    borderRadius: radii.card,
    backgroundColor: colors.card,
  },
  heroFallback: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  headingBlock: {
    gap: spacing.xs,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.xs,
  },
  priceHint: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  section: {
    gap: spacing.sm,
  },
  planList: {
    gap: spacing.sm,
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
    gap: spacing.sm,
  },
  ctaHint: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    minHeight: 15,
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaDisabled: {
    opacity: 0.4,
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
