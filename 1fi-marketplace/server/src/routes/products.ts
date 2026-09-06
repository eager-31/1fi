import { Router } from 'express';
import { findProduct, products } from '../data/products';
import { emiPlansByProduct, maxNoCostTenure } from '../data/emiPlans';
import { ApiError } from '../middleware/errorHandler';

export const productsRouter = Router();

productsRouter.get('/', (_req, res) => {
  res.json({ products, noCostEmiMaxMonths: maxNoCostTenure });
});

productsRouter.get('/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    throw new ApiError(404, `Product "${req.params.id}" does not exist`, 'PRODUCT_NOT_FOUND');
  }
  res.json({ product });
});

productsRouter.get('/:id/emi-plans', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    throw new ApiError(404, `Product "${req.params.id}" does not exist`, 'PRODUCT_NOT_FOUND');
  }
  res.json({ emiPlans: emiPlansByProduct[product.id] ?? [] });
});
