import { EMIPlan, Product } from '../types';
import { products } from './products';

interface PlanTemplate {
  tenureMonths: number;
  /** Annual (nominal) interest rate. 0 => no-cost EMI. */
  interestRatePct: number;
  processingFee: number;
}

/**
 * Offer template applied to every product. 3 and 6 months are no-cost;
 * 12 months carries interest so the reducing-balance math is actually exercised.
 */
const PLAN_TEMPLATES: PlanTemplate[] = [
  { tenureMonths: 3, interestRatePct: 0, processingFee: 0 },
  { tenureMonths: 6, interestRatePct: 0, processingFee: 0 },
  { tenureMonths: 12, interestRatePct: 14, processingFee: 399 },
];

/**
 * Standard reducing-balance EMI:
 *   EMI = P·r·(1+r)^n / ((1+r)^n − 1)
 * where r is the monthly rate and n the tenure in months. For a 0% plan this
 * collapses to P / n.
 */
function computeMonthlyAmount(principal: number, tenureMonths: number, annualRatePct: number): number {
  if (annualRatePct === 0) {
    return Math.round(principal / tenureMonths);
  }
  const r = annualRatePct / 12 / 100;
  const growth = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * growth) / (growth - 1);
  return Math.round(emi);
}

function buildPlan(product: Product, template: PlanTemplate): EMIPlan {
  const monthlyAmount = computeMonthlyAmount(
    product.basePrice,
    template.tenureMonths,
    template.interestRatePct,
  );
  return {
    id: `${product.id}-m${template.tenureMonths}`,
    productId: product.id,
    tenureMonths: template.tenureMonths,
    interestRatePct: template.interestRatePct,
    monthlyAmount,
    processingFee: template.processingFee,
    totalPayable: monthlyAmount * template.tenureMonths + template.processingFee,
  };
}

export const emiPlansByProduct: Record<string, EMIPlan[]> = Object.fromEntries(
  products.map((product) => [
    product.id,
    PLAN_TEMPLATES.map((template) => buildPlan(product, template)),
  ]),
);

/** Largest tenure that is genuinely no-cost — used for the "No-cost EMI upto N months" copy. */
export const maxNoCostTenure: number = PLAN_TEMPLATES
  .filter((t) => t.interestRatePct === 0)
  .reduce((max, t) => Math.max(max, t.tenureMonths), 0);
