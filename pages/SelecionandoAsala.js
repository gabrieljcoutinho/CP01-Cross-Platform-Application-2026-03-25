import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const RoomButton = ({ title, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], width: '100%' }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.roomButton}
        >
          <Text style={styles.roomText}>{title}</Text>
          <View style={styles.glow} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function RoomSelectionScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000428', '#004e92']} style={styles.background} />

      <View style={styles.header}>
        <Text style={styles.title}>ESCOLHA SUA</Text>
        <Text style={styles.subtitle}>SALA</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.menu}>
        <RoomButton title="SALA DE ESTAR" index={0} />
        <RoomButton title="COZINHA GOURMET" index={1} />
        <RoomButton title="QUARTO MASTER" index={2} />
        <RoomButton title="ÁREA EXTERNA" index={3} />
      </View>
    </View>
  );
}

// Css da responsividade desse componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    color: '#00d2ff',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 60,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#00d2ff',
    marginTop: 10,
  },
  menu: {
    gap: 15,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  roomButton: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2,
  },
  glow: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00d2ff',
    shadowColor: '#00d2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  }
});