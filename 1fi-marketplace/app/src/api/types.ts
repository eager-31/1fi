import type { EMIPlan, Product } from '../types';

export interface ProductsResponse {
  products: Product[];
  /** Largest genuinely no-cost EMI tenure, for the "No-cost EMI upto N months" copy. */
  noCostEmiMaxMonths: number;
}

export interface ProductResponse {
  product: Product;
}

export interface EmiPlansResponse {
  emiPlans: EMIPlan[];
}

export interface ApiErrorShape {
  error: {
    code: string;
    message: string;
  };
}
