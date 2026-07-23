import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { initDatabase } from './src/database/schema';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { PurchasesScreen } from './src/screens/PurchasesScreen';
import { ExpiryScreen } from './src/screens/ExpiryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { PromotionsScreen } from './src/screens/PromotionsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Empty placeholder for the center tab (its onPress is intercepted)
function DummyScreen() {
  return <View />;
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0F1E',
          borderTopColor: '#1E2740',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#60A5FA',
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Início') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Compras') iconName = focused ? 'bag-handle' : 'bag-handle-outline';
          else if (route.name === 'Registrar') iconName = 'add';
          else if (route.name === 'Validade') iconName = focused ? 'time' : 'time-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';

          // Center FAB button
          if (route.name === 'Registrar') {
            return (
              <View style={styles.fabContainer}>
                <View style={styles.fab}>
                  <Ionicons name="add" size={30} color="#fff" />
                </View>
              </View>
            );
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Compras" component={PurchasesScreen} />
      <Tab.Screen
        name="Registrar"
        component={DummyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Scanner');
          },
        })}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Validade" component={ExpiryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => setDbInitialized(true))
      .catch((e) => console.error('DB Init Error:', e));
  }, []);

  if (!dbInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text style={styles.loadingText}>Inicializando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Promocoes" component={PromotionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#060B18',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#60A5FA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#60A5FA',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
});
