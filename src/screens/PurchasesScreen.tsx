import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Purchase {
  id: string;
  store: string;
  date: string;
  total: string;
  items: number;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const mockPurchases: Purchase[] = [
  { id: '1', store: 'Carrefour', date: '20/05/2024', total: 'R$ 320,50', items: 3, color: '#1E40AF', icon: 'cart' },
  { id: '2', store: 'Assaí Atacadista', date: '18/05/2024', total: 'R$ 215,80', items: 7, color: '#DC2626', icon: 'storefront' },
  { id: '3', store: 'Extra Mercado', date: '15/05/2024', total: 'R$ 158,40', items: 5, color: '#EAB308', icon: 'basket' },
  { id: '4', store: 'Pão de Açúcar', date: '10/05/2024', total: 'R$ 274,20', items: 6, color: '#16A34A', icon: 'bag-handle' },
  { id: '5', store: 'Atacadão', date: '08/05/2024', total: 'R$ 412,30', items: 12, color: '#0284C7', icon: 'cart' },
  { id: '6', store: 'Dia Supermercados', date: '05/05/2024', total: 'R$ 89,90', items: 4, color: '#E11D48', icon: 'storefront' },
];

export function PurchasesScreen() {
  const [activeFilter, setActiveFilter] = useState('Este mês');
  const filters = ['Todas', 'Este mês', 'Mês passado'];

  const totalGasto = 'R$ 968,90';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Compras</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total gasto</Text>
        <Text style={styles.totalValue}>{totalGasto}</Text>
      </View>

      {/* List */}
      <FlatList
        data={mockPurchases}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.purchaseCard}>
            <View style={[styles.storeIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View style={styles.purchaseInfo}>
              <Text style={styles.storeName}>{item.store}</Text>
              <Text style={styles.storeDate}>{item.date}</Text>
            </View>
            <View style={styles.purchaseRight}>
              <Text style={styles.purchaseTotal}>{item.total}</Text>
              <Text style={styles.purchaseItems}>{item.items} itens {'>'}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#0F1629',
    borderWidth: 1,
    borderColor: '#1E2740',
  },
  filterBtnActive: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
  },
  filterText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  totalLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },
  totalValue: {
    color: '#60A5FA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  purchaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1629',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E2740',
    padding: 16,
    marginBottom: 12,
  },
  storeIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  purchaseInfo: {
    flex: 1,
  },
  storeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  storeDate: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  purchaseRight: {
    alignItems: 'flex-end',
  },
  purchaseTotal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchaseItems: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
});
