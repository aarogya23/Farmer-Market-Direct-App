import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLanguage } from '@/components/language-context';
import * as marketData from '@/constants/market-data';

const fallbackHighlights = {
  en: [
    'Direct ordering with transparent farmer-set prices',
    'Side-by-side market comparison before checkout',
    'Pickup, delivery, and bulk request options',
  ],
  ne: [
    'किसानले तय गरेको मूल्यमा प्रत्यक्ष अर्डर',
    'किन्नु अघि बजारसँग साइड-बाइ-साइड तुलना',
    'पिकअप, डेलिभरी र थोक अनुरोधका विकल्प',
  ],
};

const fallbackMetrics = {
  en: [
    { label: 'Active farmers', value: '124' },
    { label: 'Buyer savings', value: '18%' },
    { label: 'Avg farmer uplift', value: '+26%' },
  ],
  ne: [
    { label: 'सक्रिय किसान', value: '124' },
    { label: 'ग्राहक बचत', value: '18%' },
    { label: 'किसान आम्दानी वृद्धि', value: '+26%' },
  ],
};

const fallbackProducts = {
  en: [
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
      imageUri: 'https://images.unsplash.com/photo-1542831364-da5cf6c8d1f7?auto=format&fit=crop&w=800&q=80',
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
      imageUri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
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
      imageUri: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80',
    },
  ],
  ne: [
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
      imageUri: 'https://images.unsplash.com/photo-1542831364-da5cf6c8d1f7?auto=format&fit=crop&w=800&q=80',
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
      imageUri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
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
      imageUri: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

export default function MarketScreen() {
  const { language, t } = useLanguage();
  const buyerHighlights =
    typeof marketData.getBuyerHighlights === 'function'
      ? marketData.getBuyerHighlights(language)
      : fallbackHighlights[language];
  const impactMetrics =
    typeof marketData.getImpactMetrics === 'function'
      ? marketData.getImpactMetrics(language)
      : fallbackMetrics[language];
  const products =
    typeof marketData.getProducts === 'function'
      ? marketData.getProducts(language)
      : fallbackProducts[language];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroGlowOne} />
        <View style={styles.heroGlowTwo} />
        <Text style={styles.eyebrow}>{t.market.eyebrow}</Text>
        <Text style={styles.heroTitle}>{t.market.title}</Text>
        <Text style={styles.heroText}>{t.market.description}</Text>

        <View style={styles.metricsRow}>
          {impactMetrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.market.howItWorks}</Text>
        {buyerHighlights.map((highlight) => (
          <View key={highlight} style={styles.featureRow}>
            <View style={styles.featureIconWrap}>
              <MaterialIcons name="check" size={18} color="#214d2b" />
            </View>
            <Text style={styles.featureText}>{highlight}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.market.listings}</Text>
          <Text style={styles.sectionLink}>{t.market.viewAll}</Text>
        </View>

        {products.map((product) => {
          const savings = product.marketPrice - product.price;

          return (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.imageUri }} style={styles.productImage} />
              <View style={styles.productHeader}>
                <View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productMeta}>
                    {product.farmer} {' - '} {product.location}
                  </Text>
                </View>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceBadgeText}>{t.market.save} Rs {savings}</Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.priceLabel}>{t.market.farmerPrice}</Text>
                  <Text style={styles.primaryPrice}>
                    Rs {product.price}/{product.unit}
                  </Text>
                </View>
                <View>
                  <Text style={styles.priceLabel}>{t.market.marketAverage}</Text>
                  <Text style={styles.marketPrice}>
                    Rs {product.marketPrice}/{product.unit}
                  </Text>
                </View>
              </View>

              <View style={styles.tagRow}>
                {product.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.productFooter}>
                <Text style={styles.stockText}>{product.stock}</Text>
                <Text style={styles.deliveryText}>{product.pickup}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>{t.market.impactTitle}</Text>
        <Text style={styles.ctaText}>{t.market.impactText}</Text>
        <View style={styles.ctaRow}>
          <View style={styles.ctaPill}>
            <MaterialIcons name="storefront" size={16} color="#fff8ea" />
            <Text style={styles.ctaPillText}>{t.market.farmerListing}</Text>
          </View>
          <View style={styles.ctaPill}>
            <MaterialIcons name="shopping-bag" size={16} color="#fff8ea" />
            <Text style={styles.ctaPillText}>{t.market.directOrder}</Text>
          </View>
          <View style={styles.ctaPill}>
            <MaterialIcons name="compare-arrows" size={16} color="#fff8ea" />
            <Text style={styles.ctaPillText}>{t.market.priceCompare}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f3e8',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 18,
  },
  hero: {
    overflow: 'hidden',
    borderRadius: 30,
    padding: 24,
    backgroundColor: '#214d2b',
    gap: 16,
  },
  heroGlowOne: {
    position: 'absolute',
    top: -50,
    right: -10,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#86b76c',
    opacity: 0.28,
  },
  heroGlowTwo: {
    position: 'absolute',
    bottom: -70,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f3c969',
    opacity: 0.18,
  },
  eyebrow: {
    color: '#dbe8cf',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.3,
  },
  heroTitle: {
    color: '#fff8ea',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  heroText: {
    color: '#dce7d4',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 520,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    minWidth: 96,
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(255, 248, 234, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 248, 234, 0.16)',
  },
  metricValue: {
    color: '#fff8ea',
    fontSize: 24,
    fontWeight: '800',
  },
  metricLabel: {
    color: '#dce7d4',
    fontSize: 13,
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    color: '#17301f',
    fontSize: 24,
    fontWeight: '800',
  },
  sectionLink: {
    color: '#467b4d',
    fontSize: 14,
    fontWeight: '700',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#fffaf0',
  },
  featureIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe8cf',
  },
  featureText: {
    flex: 1,
    color: '#2b3d2c',
    fontSize: 15,
    lineHeight: 22,
  },
  productCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 14,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 18,
    marginBottom: 14,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  productName: {
    color: '#17301f',
    fontSize: 22,
    fontWeight: '800',
  },
  productMeta: {
    color: '#6a786b',
    fontSize: 14,
    marginTop: 4,
  },
  priceBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#e6f3d8',
  },
  priceBadgeText: {
    color: '#295b30',
    fontSize: 13,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  priceLabel: {
    color: '#758076',
    fontSize: 13,
    marginBottom: 4,
  },
  primaryPrice: {
    color: '#17301f',
    fontSize: 20,
    fontWeight: '800',
  },
  marketPrice: {
    color: '#9a6840',
    fontSize: 18,
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    backgroundColor: '#f0ead6',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: '#6d5b35',
    fontSize: 12,
    fontWeight: '700',
  },
  productFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  stockText: {
    color: '#295b30',
    fontSize: 14,
    fontWeight: '700',
  },
  deliveryText: {
    color: '#7a766d',
    fontSize: 14,
  },
  ctaCard: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: '#9a6840',
    gap: 12,
  },
  ctaTitle: {
    color: '#fff8ea',
    fontSize: 24,
    fontWeight: '800',
  },
  ctaText: {
    color: '#fcefd7',
    fontSize: 15,
    lineHeight: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  ctaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: 'rgba(255, 248, 234, 0.13)',
  },
  ctaPillText: {
    color: '#fff8ea',
    fontSize: 13,
    fontWeight: '700',
  },
});
