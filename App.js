import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotação contínua e Pulsação Radical
    Animated.loop(
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Barra de progresso sincronizada com os 5 segundos
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.neonOrb, { transform: [{ rotate: spin }, { scale: pulseAnim }] }]}>
        <View style={styles.coreInner} />
      </Animated.View>

      <Text style={styles.loaderText}>LOADING ASSETS</Text>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: barWidth }]} />
      </View>
    </View>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
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

const styles = StyleSheet.create({
  // TELA PRINCIPAL (FUNDO BRANCO)
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

  // TELA DE CARREGAMENTO (FUNDO PRETO)
  loaderContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  neonOrb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#00ff88',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 20,
  },
  coreInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00ff88',
  },
  loaderText: {
    color: '#00ff88',
    marginTop: 40,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
  },
  progressTrack: {
    width: width * 0.6,
    height: 2,
    backgroundColor: '#1a1a1a',
    marginTop: 20,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  /* Css da responsividade desse componente */
  ...(width > 768 ? {
    neonOrb: { width: 200, height: 200, borderRadius: 100 },
    progressTrack: { width: 400 },
    loaderText: { fontSize: 16 }
  } : {})
});