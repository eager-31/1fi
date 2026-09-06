import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProducts } from '../api/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductListSkeleton } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { spacing } from '../theme';
import type { ShopStackParamList } from '../navigation/types';
import type { Product } from '../types';

interface MarketplaceTabProps {
  searchQuery: string;
}

type Nav = NativeStackNavigationProp<ShopStackParamList, 'ShopHome'>;

export function MarketplaceTab({ searchQuery }: MarketplaceTabProps): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { data, isLoading, isError, error, refetch, isRefetching } = useProducts();

  const filtered = useMemo(() => {
    const products = data?.products ?? [];
    const q = searchQuery.trim().toLowerCase();
    if (q.length === 0) return products;
    return products.filter((p) =>
      [p.name, p.brand, p.category].some((field) => field.toLowerCase().includes(q)),
    );
  }, [data?.products, searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.padded}>
        <ProductListSkeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load products"
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => void refetch()}
        retrying={isRefetching}
      />
    );
  }

  if ((data?.products.length ?? 0) === 0) {
    return <EmptyState icon="cube-outline" title="No products yet" message="Check back soon." />;
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="No matches"
        message={`Nothing in the Marketplace matches "${searchQuery.trim()}".`}
      />
    );
  }

  const noCostMonths = data?.noCostEmiMaxMonths ?? 0;

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: Product }) => (
        <ProductCard
          product={item}
          noCostMonths={noCostMonths}
          onPress={(product) => navigation.navigate('ProductDetail', { productId: product.id })}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  padded: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.md,
  },
});
