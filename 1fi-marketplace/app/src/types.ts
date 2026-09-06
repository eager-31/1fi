export interface Variant {
  id: string;
  label: string;
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
