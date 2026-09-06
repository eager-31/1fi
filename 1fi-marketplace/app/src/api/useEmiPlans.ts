import { useQuery } from '@tanstack/react-query';
import { apiGet } from './client';
import type { EmiPlansResponse } from './types';
import type { EMIPlan } from '../types';

export function emiPlanKey(productId: string) {
  return ['products', productId, 'emi-plans'] as const;
}

export function useEmiPlans(productId: string) {
  return useQuery<EMIPlan[]>({
    queryKey: emiPlanKey(productId),
    queryFn: async () => {
      const data = await apiGet<EmiPlansResponse>(`/products/${productId}/emi-plans`);
      return data.emiPlans;
    },
    enabled: productId.length > 0,
  });
}
