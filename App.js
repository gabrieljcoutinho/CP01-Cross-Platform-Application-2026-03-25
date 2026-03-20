import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

// Importações de componentes, hooks e estilos
import LoadingScreen from './components/LoadingScreen';
import { useAppLoader } from './hook/useAppLoader';
import { styles } from './Css/styleApp';

export default function App() {
  const isLoaded = useAppLoader(5000);

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainLabel}>OLA</Text>
      <StatusBar style="dark" />
    </View>
  );
}