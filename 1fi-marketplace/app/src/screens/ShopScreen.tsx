import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Banner } from '../components/Banner';
import { SegmentedControl, type SegmentOption } from '../components/SegmentedControl';
import { SearchBar } from '../components/SearchBar';
import { MarketplaceTab } from './MarketplaceTab';
import { TopBrandsTab } from './TopBrandsTab';
import { NearbyStoresTab } from './NearbyStoresTab';
import { colors, spacing } from '../theme';

type Segment = 'brands' | 'nearby' | 'marketplace';

const SEGMENTS: ReadonlyArray<SegmentOption<Segment>> = [
  { value: 'brands', label: 'Top Brands' },
  { value: 'nearby', label: 'Nearby Stores' },
  { value: 'marketplace', label: '1Fi Marketplace' },
];

const SEARCH_PLACEHOLDER: Record<Segment, string> = {
  brands: 'Search online stores…',
  nearby: 'Search nearby stores…',
  marketplace: 'Search products…',
};

export function ShopScreen(): React.JSX.Element {
  const [segment, setSegment] = useState<Segment>('marketplace');
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <Banner
          headline="Pay later with"
          accentWord="0% interest"
          headlineTail="no-cost EMIs upto 6 months"
          ctaLabel="How it works"
        />
        <SegmentedControl options={SEGMENTS} value={segment} onChange={setSegment} />
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={SEARCH_PLACEHOLDER[segment]}
          editable={segment === 'marketplace'}
        />
      </View>

      <View style={styles.content}>
        {segment === 'marketplace' ? (
          <MarketplaceTab searchQuery={query} />
        ) : segment === 'brands' ? (
          <TopBrandsTab />
        ) : (
          <NearbyStoresTab />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
});
