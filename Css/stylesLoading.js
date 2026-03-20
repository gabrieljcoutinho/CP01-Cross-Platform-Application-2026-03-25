import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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