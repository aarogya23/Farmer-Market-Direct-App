import { AppLanguage } from '@/constants/translations';

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

export function getImpactMetrics(language: AppLanguage) {
  return language === 'ne'
    ? [
        { label: 'सक्रिय किसान', value: '124' },
        { label: 'ग्राहक बचत', value: '18%' },
        { label: 'किसान आम्दानी वृद्धि', value: '+26%' },
      ]
    : [
        { label: 'Active farmers', value: '124' },
        { label: 'Buyer savings', value: '18%' },
        { label: 'Avg farmer uplift', value: '+26%' },
      ];
}

export function getBuyerHighlights(language: AppLanguage) {
  return language === 'ne'
    ? [
        'किसानले तय गरेको मूल्यमा प्रत्यक्ष अर्डर',
        'किन्नु अघि बजारसँग साइड-बाइ-साइड तुलना',
        'पिकअप, डेलिभरी र थोक अनुरोधका विकल्प',
      ]
    : [
        'Direct ordering with transparent farmer-set prices',
        'Side-by-side market comparison before checkout',
        'Pickup, delivery, and bulk request options',
      ];
}

export function getProducts(language: AppLanguage): Product[] {
  return language === 'ne'
    ? [
        {
          id: 'prod-1',
          name: 'गोलभेंडा',
          farmer: 'सीता अर्गानिक फार्म',
          location: 'भरतपुर',
          unit: 'क्रेट',
          price: 780,
          marketPrice: 930,
          stock: '४२ क्रेट तयार',
          pickup: 'भोलि बिहान डेलिभरी',
          tags: ['बिषादीरहित', 'धेरै बिक्री हुने'],
        },
        {
          id: 'prod-2',
          name: 'ताजा पालुंगो',
          farmer: 'ग्रीन भ्याली सहकारी',
          location: 'पोखरा',
          unit: 'गाँठा',
          price: 55,
          marketPrice: 70,
          stock: '१६० गाँठा',
          pickup: 'आजै पिकअप',
          tags: ['पातेदार तरकारी', 'रेस्टुरेन्टको रोजाइ'],
        },
        {
          id: 'prod-3',
          name: 'रातो चामल',
          farmer: 'हिलसाइड हार्भेस्ट',
          location: 'लमजुङ',
          unit: '२५ केजी बोर',
          price: 1950,
          marketPrice: 2280,
          stock: '१८ बोर',
          pickup: '२ दिनमा ढुवानी',
          tags: ['प्रिमियम अन्न', 'उच्च माग'],
        },
      ]
    : [
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
}

export function getWeatherAlerts(language: AppLanguage): WeatherAlert[] {
  return language === 'ne'
    ? [
        {
          id: 'weather-1',
          title: 'भारी वर्षाको सम्भावना',
          severity: 'High',
          window: 'आज राति ९ बजे देखि ४ बजे सम्म',
          guidance: 'भित्र्याइएका तरकारी छोप्नुहोस् र मल वा औषधि छर्न केही समय रोक्नुहोस्।',
        },
        {
          id: 'weather-2',
          title: 'दिउँसो तेज हावा',
          severity: 'Medium',
          window: 'शुक्रबार, दिउँसो १ बजे देखि ५ बजे सम्म',
          guidance: 'प्लास्टिक टनेल वा पोलिहाउस सुरक्षित गर्नुहोस् र टमाटर बाँध्ने काम बेलुका गर्नुहोस्।',
        },
      ]
    : [
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
}

export function getCropSuggestions(language: AppLanguage): CropSuggestion[] {
  return language === 'ne'
    ? [
        {
          id: 'crop-1',
          crop: 'क्याप्सिकम',
          reason: 'सहरका ग्राहकले राम्रो मूल्य दिइरहेका छन् र यो हप्ताको आपूर्ति कम छ।',
          expectedMargin: 'उच्च नाफा',
          waterNeed: 'मध्यम पानी',
        },
        {
          id: 'crop-2',
          crop: 'रायो साग',
          reason: 'छोटो उत्पादन चक्र भएकाले मौसमसँग मिल्छ र नियमित ग्राहकको माग बलियो छ।',
          expectedMargin: 'स्थिर नाफा',
          waterNeed: 'कम पानी',
        },
        {
          id: 'crop-3',
          crop: 'बेसार',
          reason: 'लामो चक्र भए पनि मूल्य बढ्दो छ र सहकारी खरिदकर्ताले थोक सम्झौता चाहिरहेका छन्।',
          expectedMargin: 'मौसमी फाइदा',
          waterNeed: 'मध्यम पानी',
        },
      ]
    : [
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
}

export function getPriceSignals(language: AppLanguage) {
  return language === 'ne'
    ? [
        { market: 'थोक बजार', crop: 'गोलभेंडा', trend: '+12%', note: 'वर्षापछि आपूर्ति घट्यो।' },
        { market: 'खुद्रा पसल', crop: 'पालुंगो', trend: '+8%', note: 'रेस्टुरेन्टको अर्डर बढेको छ।' },
        { market: 'थोक खरिदकर्ता', crop: 'चामल', trend: '-3%', note: 'यो हप्ता भण्डार स्थिर छ।' },
      ]
    : [
        { market: 'Wholesale market', crop: 'Tomatoes', trend: '+12%', note: 'Supply dropped after rain.' },
        { market: 'Retail stores', crop: 'Spinach', trend: '+8%', note: 'Restaurants increasing orders.' },
        { market: 'Bulk buyers', crop: 'Rice', trend: '-3%', note: 'Stable inventory this week.' },
      ];
}
