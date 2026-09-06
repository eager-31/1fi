import { networkInterfaces } from 'node:os';
import cors from 'cors';
import express from 'express';
import { emiPlansByProduct } from './data/emiPlans';
import { products } from './data/products';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { latency } from './middleware/latency';
import { productsRouter } from './routes/products';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());
app.use(latency);

app.get('/', (_req, res) => {
  res.json({
    name: '1Fi Marketplace mock API',
    endpoints: [
      'GET /health',
      'GET /products',
      'GET /products/:id',
      'GET /products/:id/emi-plans',
    ],
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    productCount: products.length,
    emiPlanCount: Object.values(emiPlansByProduct).flat().length,
  });
});

app.use('/products', productsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

function lanAddress(): string | undefined {
  for (const iface of Object.values(networkInterfaces())) {
    for (const net of iface ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return undefined;
}

app.listen(PORT, () => {
  const lan = lanAddress();
  // eslint-disable-next-line no-console
  console.log(`1Fi Marketplace mock API listening:`);
  // eslint-disable-next-line no-console
  console.log(`  local:  http://localhost:${PORT}`);
  if (lan) {
    // eslint-disable-next-line no-console
    console.log(`  LAN:    http://${lan}:${PORT}   (use this from a physical device)`);
  }
});
