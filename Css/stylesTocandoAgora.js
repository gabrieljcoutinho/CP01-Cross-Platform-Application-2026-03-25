import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Container com degradê profundo: Rosa vibrante para Preto absoluto
export const Container = styled(LinearGradient).attrs({
  colors: ['#ed145b', '#0d0d0d'],
  locations: [0, 0.4], // O rosa começa no topo e o preto assume a partir de 40% da tela
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 },
})`
  flex: 1;
  padding: ${width > 450 ? '40px' : '20px'};
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: ${width > 400 ? '36px' : '28px'};
  font-weight: 900;
  margin: 70px 0 30px;
  text-align: left;
  letter-spacing: -1px;
  text-transform: uppercase;
  /* Efeito de brilho externo no texto */
  text-shadow: 0px 0px 15px rgba(237, 20, 91, 0.6);
`;

export const Card = styled.View`
  background-color: #121212;
  padding: 22px;
  border-radius: 28px;
  margin-bottom: 20px;

  /* Borda interna sutil para definir o objeto no dark mode */
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);

  /* Glassmorphism sutil */
  shadow-color: #000;
  shadow-offset: 0px 12px;
  shadow-opacity: 0.58;
  shadow-radius: 16px;
  elevation: 24;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SongTitle = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

export const Artist = styled.Text`
  color: #ed145b; /* Artista agora em destaque rosa */
  font-size: 16px;
  font-weight: 700;
  margin-top: 2px;
`;

export const Genre = styled.Text`
  color: #555;
  font-size: 11px;
  margin-top: 6px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const LikesContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(237, 20, 91, 0.15);
  padding: 10px 16px;
  border-radius: 18px;
  border: 1px solid rgba(237, 20, 91, 0.3);
`;

export const LikesText = styled.Text`
  color: #ed145b;
  font-weight: 900;
  font-size: 14px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === 'ios' ? '50px' : '30px'};
  left: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  width: 45px;
  height: 45px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SearchInput = styled.TextInput`
  background-color: #121212;
  color: #ffffff;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 15px;
`;

/* Css da responsividade desse componente */
export const ScrollWrapper = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 50,
    width: width > 800 ? 600 : '100%', // Limita largura em tablets para não esticar
    alignSelf: 'center',
  },
})`
  flex: 1;
`;