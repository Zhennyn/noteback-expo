import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPurchases, PurchaseRecord } from '../database/dbHelper';

export function PurchasesScreen() {
  const [activeFilter, setActiveFilter] = useState('Este mês');
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const filters = ['Todas', 'Este mês', 'Mês passado'];

  useFocusEffect(
    useCallback(() => {
      getAllPurchases().then(setPurchases);
    }, [])
  );

  const totalGasto = useMemo(() => {
    const total = purchases.reduce((acc, curr) => acc + (curr.total_value || 0), 0);
    return `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [purchases]);

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
      {purchases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={64} color="#1E2740" />
          <Text style={styles.emptyTitle}>Nenhuma compra</Text>
          <Text style={styles.emptySub}>Suas notas escaneadas aparecerão aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.purchaseCard}>
              <View style={[styles.storeIcon, { backgroundColor: '#1E40AF20' }]}>
                <Ionicons name="cart" size={22} color="#60A5FA" />
              </View>
              <View style={styles.purchaseInfo}>
                <Text style={styles.storeName}>{item.store_name}</Text>
                <Text style={styles.storeDate}>{item.issue_date}</Text>
              </View>
              <View style={styles.purchaseRight}>
                <Text style={styles.purchaseTotal}>
                  R$ {(item.total_value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <Text style={styles.purchaseItems}>{item.items_count || 0} itens {'>'}</Text>
              </View>
            </TouchableOpacity>
          )}
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
