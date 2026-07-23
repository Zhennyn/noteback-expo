import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockTags = [
  { id: '1', name: 'Mercado', color: '#10B981', count: 12 },
  { id: '2', name: 'Farmácia', color: '#F43F5E', count: 3 },
  { id: '3', name: 'Ifood', color: '#EF4444', count: 5 },
];

export function TagsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Tags</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={28} color="#A78BFA" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockTags}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.tagItem}>
            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
            <Text style={styles.tagName}>{item.name}</Text>
            <Text style={styles.tagCount}>{item.count} notas</Text>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={20} color="#F43F5E" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 20,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141929',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 16,
  },
  tagName: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  tagCount: {
    color: '#94A3B8',
    marginRight: 16,
  }
});
