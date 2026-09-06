import { useQuery } from '@tanstack/react-query';
import { apiGet } from './client';
import type { ProductResponse, ProductsResponse } from './types';
import type { Product } from '../types';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: string) => ['products', id] as const,
};

export interface ProductsData {
  products: Product[];
  noCostEmiMaxMonths: number;
}

export function useProducts() {
  return useQuery<ProductsData>({
    queryKey: productKeys.all,
    queryFn: async () => {
      const data = await apiGet<ProductsResponse>('/products');
      return { products: data.products, noCostEmiMaxMonths: data.noCostEmiMaxMonths };
    },
  });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const data = await apiGet<ProductResponse>(`/products/${id}`);
      return data.product;
    },
  });
}
