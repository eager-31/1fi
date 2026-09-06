import { Product } from '../types';

/**
 * Six seed products. Prices are in whole rupees. Product images are served from
 * Amazon's image CDN (m.media-amazon.com) — content-addressed, publicly accessible
 * URLs that stay stable and load without a browser user-agent. `._SL800_` asks the
 * CDN to scale the longest edge to 800px.
 */
export const products: Product[] = [
  {
    id: 'iphone-15',
    name: 'Apple iPhone 15',
    brand: 'Apple',
    category: 'Smartphones',
    basePrice: 79900,
    images: ['https://m.media-amazon.com/images/I/71657TiFeHL._SL800_.jpg'],
    description:
      'A16 Bionic chip, 48MP main camera with 2x Telephoto, Dynamic Island and a '
      + 'durable colour-infused glass back. 6.1-inch Super Retina XDR display with USB-C.',
    variants: [
      { id: 'iphone-15-128', label: '128 GB', priceDelta: 0, inStock: true },
      { id: 'iphone-15-256', label: '256 GB', priceDelta: 10000, inStock: true },
      { id: 'iphone-15-512', label: '512 GB', priceDelta: 30000, inStock: false },
    ],
  },
  {
    id: 'galaxy-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    category: 'Smartphones',
    basePrice: 74999,
    images: ['https://m.media-amazon.com/images/I/714DutH6IBL._SL800_.jpg'],
    description:
      'Galaxy AI on a 6.2-inch FHD+ Dynamic AMOLED 2X display, Snapdragon 8 Gen 3, '
      + 'triple rear camera and an armour aluminium frame.',
    variants: [
      { id: 'galaxy-s24-128', label: '8 GB · 128 GB', priceDelta: 0, inStock: true },
      { id: 'galaxy-s24-256', label: '8 GB · 256 GB', priceDelta: 6000, inStock: true },
    ],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    basePrice: 29990,
    images: ['https://m.media-amazon.com/images/I/61O3iMlnJIL._SL800_.jpg'],
    description:
      'Industry-leading noise cancellation with two processors and eight microphones, '
      + '30-hour battery life, and Precise Voice Pickup for calls.',
    variants: [
      { id: 'sony-wh1000xm5-black', label: 'Black', priceDelta: 0, inStock: true },
      { id: 'sony-wh1000xm5-silver', label: 'Platinum Silver', priceDelta: 0, inStock: true },
      { id: 'sony-wh1000xm5-blue', label: 'Midnight Blue', priceDelta: 0, inStock: false },
    ],
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13',
    brand: 'Dell',
    category: 'Laptops',
    basePrice: 109990,
    images: ['https://m.media-amazon.com/images/I/81rvAYhIuFL._SL800_.jpg'],
    description:
      '13.4-inch InfinityEdge display, Intel Core Ultra processor, CNC-machined '
      + 'aluminium chassis and an edge-to-edge keyboard.',
    variants: [
      { id: 'dell-xps-13-i5', label: 'Core Ultra 5 · 16 GB · 512 GB', priceDelta: 0, inStock: true },
      { id: 'dell-xps-13-i7', label: 'Core Ultra 7 · 16 GB · 512 GB', priceDelta: 20000, inStock: true },
      { id: 'dell-xps-13-i7-max', label: 'Core Ultra 7 · 32 GB · 1 TB', priceDelta: 45000, inStock: true },
    ],
  },
  {
    id: 'ipad-air-11',
    name: 'Apple iPad Air 11"',
    brand: 'Apple',
    category: 'Tablets',
    basePrice: 59900,
    images: ['https://m.media-amazon.com/images/I/71JX2cz2QrL._SL800_.jpg'],
    description:
      'M2 chip, 11-inch Liquid Retina display, landscape front camera and support for '
      + 'the Apple Pencil Pro and Magic Keyboard.',
    variants: [
      { id: 'ipad-air-11-128', label: '128 GB', priceDelta: 0, inStock: true },
      { id: 'ipad-air-11-256', label: '256 GB', priceDelta: 10000, inStock: true },
      { id: 'ipad-air-11-512', label: '512 GB', priceDelta: 30000, inStock: false },
    ],
  },
  {
    id: 'oneplus-nord-ce4',
    name: 'OnePlus Nord CE4',
    brand: 'OnePlus',
    category: 'Smartphones',
    basePrice: 24999,
    images: ['https://m.media-amazon.com/images/I/61nxQ62qglL._SL800_.jpg'],
    description:
      'Snapdragon 7 Gen 3, 5500 mAh battery with 100W SUPERVOOC charging and a '
      + '6.7-inch 120Hz AMOLED display.',
    variants: [
      { id: 'oneplus-nord-ce4-128', label: '8 GB · 128 GB', priceDelta: 0, inStock: true },
      { id: 'oneplus-nord-ce4-256', label: '8 GB · 256 GB', priceDelta: 2000, inStock: true },
    ],
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
