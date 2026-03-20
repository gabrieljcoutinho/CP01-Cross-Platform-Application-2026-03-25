import React, { useEffect, useRef } from 'react';
import { Text, View, Animated, Easing, Image } from 'react-native';
import { styles } from '../Css/stylesLoading'; // Importando os estilos externos

const LoadingScreen = () => {
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const flowAnim = useRef(new Animated.Value(0)).current;
  const matrixAnims = useRef([...Array(8)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animação Audio Pulse
    Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Animação Text Flow
    Animated.loop(
      Animated.timing(flowAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    // Animação Matrix
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

  const rippleScale = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.4] });
  const rippleOpacity = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const textColor = flowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#fff', '#ff007a', '#fff'],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.logoWrapper}>
        <Animated.View style={[styles.audioPulse, { transform: [{ scale: rippleScale }], opacity: rippleOpacity }]} />
        <Image source={require('../imgs/logo.png')} style={styles.logoImg} />
      </View>

      <View style={styles.contentText}>
        <Animated.Text style={[styles.glitchText, { color: textColor }]}>FIAP MUSIC</Animated.Text>
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

export default LoadingScreen;