export type Product = {
  id: string;
  name: string;
  farmer: string;
  location: string;
  unit: string;
  price: number;
  marketPrice: number;
  stock: string;
  pickup: string;
  tags: string[];
};

export type WeatherAlert = {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  window: string;
  guidance: string;
};

export type CropSuggestion = {
  id: string;
  crop: string;
  reason: string;
  expectedMargin: string;
  waterNeed: string;
};

export const impactMetrics = [
  { label: 'Active farmers', value: '124' },
  { label: 'Buyer savings', value: '18%' },
  { label: 'Avg farmer uplift', value: '+26%' },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Tomatoes',
    farmer: 'Sita Organic Farm',
    location: 'Bharatpur',
    unit: 'crate',
    price: 780,
    marketPrice: 930,
    stock: '42 crates ready',
    pickup: 'Next morning delivery',
    tags: ['Pesticide-free', 'Best seller'],
  },
  {
    id: 'prod-2',
    name: 'Fresh Spinach',
    farmer: 'Green Valley Co-op',
    location: 'Pokhara',
    unit: 'bundle',
    price: 55,
    marketPrice: 70,
    stock: '160 bundles',
    pickup: 'Same-day pickup',
    tags: ['Leafy greens', 'Restaurant favorite'],
  },
  {
    id: 'prod-3',
    name: 'Red Rice',
    farmer: 'Hillside Harvest',
    location: 'Lamjung',
    unit: '25 kg bag',
    price: 1950,
    marketPrice: 2280,
    stock: '18 bags',
    pickup: '2-day transport',
    tags: ['Premium grain', 'High demand'],
  },
];

export const buyerHighlights = [
  'Direct ordering with transparent farmer-set prices',
  'Side-by-side market comparison before checkout',
  'Pickup, delivery, and bulk request options',
];

export const weatherAlerts: WeatherAlert[] = [
  {
    id: 'weather-1',
    title: 'Heavy rainfall risk',
    severity: 'High',
    window: 'Tonight, 9 PM to 4 AM',
    guidance: 'Cover harvested vegetables and delay spraying to avoid nutrient wash-off.',
  },
  {
    id: 'weather-2',
    title: 'Strong afternoon winds',
    severity: 'Medium',
    window: 'Friday, 1 PM to 5 PM',
    guidance: 'Secure polyhouse sheets and postpone tomato staking until evening.',
  },
];

export const cropSuggestions: CropSuggestion[] = [
  {
    id: 'crop-1',
    crop: 'Capsicum',
    reason: 'Urban buyers are paying premium rates and current supply is low this week.',
    expectedMargin: 'High margin',
    waterNeed: 'Moderate water',
  },
  {
    id: 'crop-2',
    crop: 'Mustard Greens',
    reason: 'Fast harvest cycle fits upcoming rain window and repeat buyer demand is strong.',
    expectedMargin: 'Steady margin',
    waterNeed: 'Low water',
  },
  {
    id: 'crop-3',
    crop: 'Turmeric',
    reason: 'Longer cycle, but price trend is rising and cooperative buyers want bulk contracts.',
    expectedMargin: 'Seasonal upside',
    waterNeed: 'Moderate water',
  },
];

export const priceSignals = [
  { market: 'Wholesale market', crop: 'Tomatoes', trend: '+12%', note: 'Supply dropped after rain.' },
  { market: 'Retail stores', crop: 'Spinach', trend: '+8%', note: 'Restaurants increasing orders.' },
  { market: 'Bulk buyers', crop: 'Rice', trend: '-3%', note: 'Stable inventory this week.' },
];
