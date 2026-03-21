import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  logoImg: {
    width: isMobile ? 150 : 180,
    height: isMobile ? 150 : 180,
    borderRadius: 40,
    zIndex: 2,
  },
  audioPulse: {
    position: 'absolute',
    inset: 0, // Atalho para top, bottom, left, right: 0
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
    fontSize: isMobile ? 20 : 24,
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
    marginTop: 30,
  },
  digit: {
    color: '#00ff88',
    fontFamily: 'monospace',
    fontSize: 20,
    marginHorizontal: 5,
    textShadowColor: '#00ff88',
    textShadowRadius: 10,
  }

  /* Css da responsividade desse componente */
  // Otimizado via variáveis ternárias diretamente nas propriedades
});