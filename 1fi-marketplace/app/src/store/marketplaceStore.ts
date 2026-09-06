import { create } from 'zustand';

/**
 * Holds the user's in-progress selection on the product detail screen. Keyed by
 * product id so navigating between products keeps each product's choices intact.
 */
interface MarketplaceState {
  selectedVariantByProduct: Record<string, string | undefined>;
  selectedPlanByProduct: Record<string, string | undefined>;
  selectVariant: (productId: string, variantId: string) => void;
  selectPlan: (productId: string, planId: string) => void;
  resetProduct: (productId: string) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  selectedVariantByProduct: {},
  selectedPlanByProduct: {},
  selectVariant: (productId, variantId) =>
    set((state) => ({
      selectedVariantByProduct: {
        ...state.selectedVariantByProduct,
        [productId]: variantId,
      },
    })),
  selectPlan: (productId, planId) =>
    set((state) => ({
      selectedPlanByProduct: {
        ...state.selectedPlanByProduct,
        [productId]: planId,
      },
    })),
  resetProduct: (productId) =>
    set((state) => ({
      selectedVariantByProduct: { ...state.selectedVariantByProduct, [productId]: undefined },
      selectedPlanByProduct: { ...state.selectedPlanByProduct, [productId]: undefined },
    })),
}));

/** Select primitives individually so the selector output stays referentially stable. */
export function useSelectedVariantId(productId: string): string | undefined {
  return useMarketplaceStore((state) => state.selectedVariantByProduct[productId]);
}

export function useSelectedPlanId(productId: string): string | undefined {
  return useMarketplaceStore((state) => state.selectedPlanByProduct[productId]);
}
