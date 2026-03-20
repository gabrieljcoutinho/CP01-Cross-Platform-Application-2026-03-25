import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const flowAnim = useRef(new Animated.Value(0)).current;
  const matrixAnims = useRef([...Array(8)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // 1. Animação Audio Pulse (Ripple)
    Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // 2. Animação Text Flow (Glitch/Sweep)
    Animated.loop(
      Animated.timing(flowAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    // 3. Animação Matrix Digits (Sequencial)
    const animations = matrixAnims.map((anim, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );
    });
    Animated.parallel(animations).start();
  }, []);

  // Interpolações para o Ripple
  const rippleScale = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.4] });
  const rippleOpacity = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  // Interpolação para o Texto (Simulando o Linear Gradient Flow)
  const textColor = flowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#fff', '#ff007a', '#fff'],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.logoWrapper}>
        <Animated.View
          style={[styles.audioPulse, { transform: [{ scale: rippleScale }], opacity: rippleOpacity }]}
        />
        <Image
          source={require('./imgs/logo.png')} // Certifique-se que o caminho está correto
          style={styles.logoImg}
        />
      </View>

      <View style={styles.contentText}>
        <Animated.Text style={[styles.glitchText, { color: textColor }]}>
          FIAP MUSIC
        </Animated.Text>
        <Text style={styles.subtitle}>Tecnologia que conecta, música que move.</Text>

        <View style={styles.matrixContainer}>
          {matrixAnims.map((anim, i) => {
            const translateY = anim.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [-50, 0, 0, 50] });
            const opacity = anim.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.8, 0.8, 0] });
            return (
              <Animated.Text key={i} style={[styles.digit, { opacity, transform: [{ translateY }] }]}>
                {i % 2 === 0 ? '0' : '1'}
              </Animated.Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 5000);
    return () => clearTimeout(timer);
  }, []);

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

const styles = StyleSheet.create({
  // App Principal
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLabel: { fontSize: 32, fontWeight: 'bold' },

  // Tela de Carregamento (Tradução do CSS enviado)
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  logoImg: {
    width: 180,
    height: 180,
    borderRadius: 40,
    zIndex: 2,
  },
  audioPulse: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#ff007a',
    borderRadius: 45,
    zIndex: 1,
  },
  contentText: {
    marginTop: 40,
    alignItems: 'center',
  },
  glitchText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    opacity: 0.8,
  },
  matrixContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 120,
    height: 100,
    marginTop: 30,
  },
  digit: {
    color: '#00ff88',
    fontFamily: 'monospace',
    fontSize: 20,
    marginHorizontal: 5,
    textShadowColor: '#00ff88',
    textShadowRadius: 10,
  },

  /* Css da responsividade desse componente */
  ...(width < 768 ? {
    logoImg: { width: 150, height: 150 },
    glitchText: { fontSize: 20 },
  } : {})
});