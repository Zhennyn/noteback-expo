import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Avatar & Name */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#60A5FA" />
        </View>
        <Text style={styles.userName}>Usuário</Text>
        <Text style={styles.userEmail}>usuario@email.com</Text>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>18</Text>
          <Text style={styles.statsLabel}>Notas</Text>
        </View>
        <View style={styles.statsDivider} />
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>6</Text>
          <Text style={styles.statsLabel}>Lojas</Text>
        </View>
        <View style={styles.statsDivider} />
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>24</Text>
          <Text style={styles.statsLabel}>Produtos</Text>
        </View>
      </View>

      {/* Menu Items */}
      <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
      <MenuItem icon="moon-outline" label="Tema Visual" value="Escuro" />
      <MenuItem icon="language-outline" label="Idioma" value="Português (BR)" />
      <MenuItem icon="notifications-outline" label="Notificações" value="Ativadas" />

      <Text style={styles.sectionTitle}>SISTEMA</Text>
      <MenuItem icon="cloud-download-outline" label="Buscar Atualizações" value="v1.0.0" />
      <MenuItem icon="shield-checkmark-outline" label="Privacidade" />
      <MenuItem icon="help-circle-outline" label="Ajuda e Suporte" />
      <MenuItem icon="information-circle-outline" label="Sobre o App" />

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

function MenuItem({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value?: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={icon} size={22} color="#60A5FA" />
      <Text style={styles.menuLabel}>{label}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#475569" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060B18',
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0F1629',
    borderWidth: 2,
    borderColor: '#60A5FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#0F1629',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E2740',
    marginHorizontal: 20,
    padding: 18,
    marginBottom: 28,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statsLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },
  statsDivider: {
    width: 1,
    backgroundColor: '#1E2740',
  },
  sectionTitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1629',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2740',
    gap: 14,
  },
  menuLabel: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  menuValue: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
