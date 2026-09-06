export interface Variant {
  id: string;
  label: string;
  /** Added to (or subtracted from) the product base price when this variant is selected. */
  priceDelta: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  brand: string;
  basePrice: number;
  variants: Variant[];
  category: string;
  description: string;
}

export interface EMIPlan {
  id: string;
  productId: string;
  tenureMonths: number;
  interestRatePct: number;
  monthlyAmount: number;
  processingFee: number;
  totalPayable: number;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
}
