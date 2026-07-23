import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Promotion, fetchPromotions } from '../services/scraping/promotionsScraper';

export function PromotionsScreen() {
  const navigation = useNavigation();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    setLoading(true);
    const data = await fetchPromotions();
    setPromotions(data);
    setLoading(false);
  };

  const renderItem = ({ item }: { item: Promotion }) => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name="pricetag" size={22} color="#10B981" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.store}>{item.store}</Text>
        <View style={styles.categoryRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceColumn}>
        {item.oldPrice && (
          <Text style={styles.oldPrice}>{item.oldPrice}</Text>
        )}
        <View style={styles.priceBox}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Promoções</Text>
        <TouchableOpacity onPress={loadPromotions}>
          <Ionicons name="refresh-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Ionicons name="flash" size={20} color="#F59E0B" />
        <Text style={styles.bannerText}>Ofertas de 10 mercados atualizadas em tempo real</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.loadingText}>Buscando as melhores ofertas...</Text>
        </View>
      ) : promotions.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="sad-outline" size={48} color="#475569" />
          <Text style={styles.emptyText}>Nenhuma promoção encontrada no momento.</Text>
        </View>
      ) : (
        <FlatList
          data={promotions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060B18',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2235',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  bannerText: {
    color: '#F59E0B',
    fontSize: 13,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: 12,
  },
  emptyText: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1629',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E2740',
    padding: 14,
    marginBottom: 12,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  store: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 3,
  },
  categoryRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  categoryBadge: {
    backgroundColor: '#1A2235',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    color: '#60A5FA',
    fontSize: 11,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  oldPrice: {
    color: '#94A3B8',
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  priceBox: {
    backgroundColor: '#10B98120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  price: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
