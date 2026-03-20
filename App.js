import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadingScreen from './components/LoadingScreen'; // Importando o componente

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Se não carregou, exibe a LoadingScreen
  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  // App principal após os 5 segundos
  return (
    <View style={styles.container}>
      <Text style={styles.mainLabel}>OLA</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
});