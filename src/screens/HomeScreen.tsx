import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getSummaryStats, PurchaseStats } from '../database/dbHelper';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [stats, setStats] = useState<PurchaseStats>({ totalCompras: 0, totalGasto: 0 });

  useFocusEffect(
    useCallback(() => {
      getSummaryStats().then(setStats);
    }, [])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.logo}>WGR</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>Olá, Usuário!</Text>
        <Text style={styles.greetingSub}>Bem-vindo de volta</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Resumo das compras</Text>
          <TouchableOpacity style={styles.summaryPeriod}>
            <Text style={styles.summaryPeriodText}>Este mês</Text>
            <Ionicons name="chevron-down" size={16} color="#A78BFA" />
          </TouchableOpacity>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Ionicons name="bag-handle-outline" size={28} color="#60A5FA" />
            <Text style={styles.statValue}>{stats.totalCompras}</Text>
            <Text style={styles.statLabel}>Compras{'\n'}realizadas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statCurrency}>R$</Text>
            <Text style={styles.statValue}>
              {stats.totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <Text style={styles.statLabel}>Total gasto</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="receipt-outline" size={28} color="#60A5FA" />
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Notas fiscais{'\n'}salvas</Text>
          </View>
        </View>
      </View>

      {/* Quick Access */}
      <Text style={styles.sectionTitle}>Acesso rápido</Text>
      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('Compras')}>
          <Ionicons name="receipt-outline" size={24} color="#60A5FA" />
          <Text style={styles.quickBtnText}>Notas Fiscais</Text>
          <Ionicons name="chevron-forward" size={18} color="#475569" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('Scanner')}>
          <Ionicons name="qr-code-outline" size={24} color="#60A5FA" />
          <Text style={styles.quickBtnText}>Scanner</Text>
          <Ionicons name="chevron-forward" size={18} color="#475569" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn}>
          <Ionicons name="time-outline" size={24} color="#60A5FA" />
          <Text style={styles.quickBtnText}>Histórico</Text>
          <Ionicons name="chevron-forward" size={18} color="#475569" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('Promocoes')}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#60A5FA" />
          <Text style={styles.quickBtnText}>Promoções</Text>
          <Ionicons name="chevron-forward" size={18} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* Expiry Products */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Produtos próximos da validade</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Validade')}>
          <Text style={styles.seeAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <ProductExpiryCard
        name="Leite Integral"
        brand="Parmalat 1L"
        date="05/06/2024"
        daysLeft={5}
        color="#EF4444"
      />
      <ProductExpiryCard
        name="Iogurte Natural"
        brand="Batavo 170g"
        date="07/06/2024"
        daysLeft={7}
        color="#F59E0B"
      />
      <ProductExpiryCard
        name="Queijo Mussarela"
        brand="Porto Alegre 200g"
        date="10/06/2024"
        daysLeft={10}
        color="#10B981"
      />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

function ProductExpiryCard({ name, brand, date, daysLeft, color }: {
  name: string; brand: string; date: string; daysLeft: number; color: string;
}) {
  return (
    <View style={styles.expiryCard}>
      <View style={styles.expiryImagePlaceholder}>
        <Ionicons name="cube-outline" size={28} color="#60A5FA" />
      </View>
      <View style={styles.expiryInfo}>
        <Text style={styles.expiryName}>{name}</Text>
        <Text style={styles.expiryBrand}>{brand}</Text>
        <View style={styles.expiryDateRow}>
          <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
          <Text style={styles.expiryDays}> Vence em {daysLeft} dias</Text>
        </View>
      </View>
      <View style={[styles.expiryBadge, { borderColor: color }]}>
        <Text style={[styles.expiryBadgeText, { color }]}>{date}</Text>
      </View>
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
    paddingBottom: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  greeting: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  greetingSub: {
    fontSize: 15,
    color: '#94A3B8',
    marginTop: 4,
  },
  summaryCard: {
    marginHorizontal: 20,
    backgroundColor: '#0F1629',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E2740',
    padding: 20,
    marginBottom: 28,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  summaryPeriod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryPeriodText: {
    color: '#A78BFA',
    fontSize: 14,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statCurrency: {
    fontSize: 14,
    color: '#60A5FA',
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#1E2740',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 14,
  },
  seeAll: {
    color: '#60A5FA',
    fontSize: 14,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 28,
  },
  quickBtn: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1629',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2740',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 10,
  },
  quickBtnText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  expiryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1629',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2740',
    padding: 14,
  },
  expiryImagePlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#1A2235',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  expiryInfo: {
    flex: 1,
  },
  expiryName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  expiryBrand: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  expiryDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  expiryDays: {
    color: '#94A3B8',
    fontSize: 12,
  },
  expiryBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  expiryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
