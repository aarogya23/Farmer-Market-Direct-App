import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { buyerHighlights, impactMetrics, products } from '@/constants/market-data';

export default function MarketScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroGlowOne} />
        <View style={styles.heroGlowTwo} />
        <Text style={styles.eyebrow}>Farmer Market Direct</Text>
        <Text style={styles.heroTitle}>Fair prices for farmers. Fresh deals for buyers.</Text>
        <Text style={styles.heroText}>
          A direct marketplace where farmers list produce, buyers order without middlemen, and
          everyone sees a clear market price comparison before purchase.
        </Text>

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
        <Text style={styles.sectionTitle}>How the app works</Text>
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
          <Text style={styles.sectionTitle}>Live product listings</Text>
          <Text style={styles.sectionLink}>View all</Text>
        </View>

        {products.map((product) => {
          const savings = product.marketPrice - product.price;

          return (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productMeta}>
                    {product.farmer} {' - '} {product.location}
                  </Text>
                </View>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceBadgeText}>Save Rs {savings}</Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.priceLabel}>Farmer price</Text>
                  <Text style={styles.primaryPrice}>
                    Rs {product.price}/{product.unit}
                  </Text>
                </View>
                <View>
                  <Text style={styles.priceLabel}>Market average</Text>
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
        <Text style={styles.ctaTitle}>Built for social impact</Text>
        <Text style={styles.ctaText}>
          Every direct order helps farmers keep more of the sale price while giving buyers fresher,
          more trustworthy produce.
        </Text>
        <View style={styles.ctaRow}>
          <View style={styles.ctaPill}>
            <MaterialIcons name="storefront" size={16} color="#fff8ea" />
            <Text style={styles.ctaPillText}>Farmer listing</Text>
          </View>
          <View style={styles.ctaPill}>
            <MaterialIcons name="shopping-bag" size={16} color="#fff8ea" />
            <Text style={styles.ctaPillText}>Direct order</Text>
          </View>
          <View style={styles.ctaPill}>
            <MaterialIcons name="compare-arrows" size={16} color="#fff8ea" />
            <Text style={styles.ctaPillText}>Price compare</Text>
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
