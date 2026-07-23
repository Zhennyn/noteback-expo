import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExpiryProduct {
  id: string;
  name: string;
  brand: string;
  date: string;
  daysLeft: number;
}

const mockProducts: ExpiryProduct[] = [
  { id: '1', name: 'Leite Integral', brand: 'Parmalat 1L', date: '05/06/2024', daysLeft: 5 },
  { id: '2', name: 'Iogurte Natural', brand: 'Batavo 170g', date: '07/06/2024', daysLeft: 7 },
  { id: '3', name: 'Queijo Mussarela', brand: 'Porto Alegre 200g', date: '10/06/2024', daysLeft: 10 },
  { id: '4', name: 'Presunto Cozido', brand: 'Sadia 180g', date: '12/06/2024', daysLeft: 12 },
  { id: '5', name: 'Manteiga com Sal', brand: 'Presidente 200g', date: '15/06/2024', daysLeft: 15 },
  { id: '6', name: 'Requeijão', brand: 'Catupiry 220g', date: '18/06/2024', daysLeft: 18 },
];

function getExpiryColor(daysLeft: number): string {
  if (daysLeft <= 5) return '#EF4444';
  if (daysLeft <= 10) return '#F59E0B';
  return '#10B981';
}

export function ExpiryScreen() {
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

      <FlatList
        data={mockProducts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const color = getExpiryColor(item.daysLeft);
          return (
            <View style={styles.card}>
              <View style={[styles.cardStripe, { backgroundColor: color }]} />
              <View style={styles.cardIcon}>
                <Ionicons name="cube-outline" size={26} color="#60A5FA" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <View style={styles.cardDateRow}>
                  <Ionicons name="calendar-outline" size={13} color="#94A3B8" />
                  <Text style={styles.cardDays}> Vence em {item.daysLeft} dias</Text>
                </View>
              </View>
              <View style={[styles.dateBadge, { borderColor: color }]}>
                <Text style={[styles.dateBadgeText, { color }]}>{item.date}</Text>
              </View>
            </View>
          );
        }}
      />
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
