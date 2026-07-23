import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <View style={styles.premiumBanner}>
        <Ionicons name="star" size={32} color="#fff" />
        <View style={styles.premiumTextContainer}>
          <Text style={styles.premiumTitle}>NoteBack Premium</Text>
          <Text style={styles.premiumDesc}>Desbloqueie todos os recursos!</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </View>

      <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
      <SettingItem icon="moon" title="Tema Visual" value="Escuro" />
      <SettingItem icon="language" title="Idioma" value="Português (BR)" />

      <Text style={styles.sectionTitle}>SISTEMA (OTA)</Text>
      <SettingItem icon="cloud-download" title="Buscar Atualizações" value="Versão 1.0.0" />
    </ScrollView>
  );
}

function SettingItem({ icon, title, value }: { icon: any, title: string, value: string }) {
  return (
    <TouchableOpacity style={styles.item}>
      <Ionicons name={icon} size={24} color="#A78BFA" />
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemValue}>{value}</Text>
      <Ionicons name="chevron-forward" size={20} color="#475569" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  premiumBanner: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  premiumTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  premiumTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  premiumDesc: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141929',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  itemTitle: {
    flex: 1,
    color: '#fff',
    marginLeft: 16,
    fontSize: 16,
  },
  itemValue: {
    color: '#94A3B8',
    marginRight: 8,
  }
});
