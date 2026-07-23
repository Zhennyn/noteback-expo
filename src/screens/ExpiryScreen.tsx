import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getExpiringProducts, ProductRecord } from '../database/dbHelper';

function getExpiryColor(daysLeft: number): string {
  if (daysLeft <= 5) return '#EF4444';
  if (daysLeft <= 10) return '#F59E0B';
  return '#10B981';
}

export function ExpiryScreen() {
  const [products, setProducts] = useState<ProductRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      getExpiringProducts().then(setProducts);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Validade</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Urgente (≤5 dias)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Atenção (≤10 dias)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Tranquilo (>10 dias)</Text>
        </View>
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={64} color="#1E2740" />
          <Text style={styles.emptyTitle}>Nenhum produto</Text>
          <Text style={styles.emptySub}>Seus produtos com validade/garantia aparecerão aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            // Fake days calculation since we don't have expiry_date in DB yet
            const daysLeft = 30; 
            const color = getExpiryColor(daysLeft);
            return (
              <View style={styles.card}>
                <View style={[styles.cardStripe, { backgroundColor: color }]} />
                <View style={styles.cardIcon}>
                  <Ionicons name="cube-outline" size={26} color="#60A5FA" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardBrand}>{item.store_name}</Text>
                  <View style={styles.cardDateRow}>
                    <Ionicons name="calendar-outline" size={13} color="#94A3B8" />
                    <Text style={styles.cardDays}> Compra: {item.issue_date || 'N/A'}</Text>
                  </View>
                </View>
                <View style={[styles.dateBadge, { borderColor: color }]}>
                  <Text style={[styles.dateBadgeText, { color }]}>+30 dias</Text>
                </View>
              </View>
            );
          }}
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
  legend: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySub: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
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
    overflow: 'hidden',
  },
  cardStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#1A2235',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  cardBrand: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardDays: {
    color: '#94A3B8',
    fontSize: 12,
  },
  dateBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dateBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
