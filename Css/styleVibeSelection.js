import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 70) / 2; // Ajuste para 2 colunas com espaçamento

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const MainBackground = styled(LinearGradient)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  padding-horizontal: 25px;
  padding-top: 60px;
  padding-bottom: 40px;
`;

export const HeaderSection = styled.View`
  margin-bottom: 25px;
  border-left-width: 4px;
  border-left-color: #ed145b;
  padding-left: 15px;
`;

export const TitleMain = styled.Text`
  color: #ffffff;
  font-size: 38px;
  font-weight: 900;
  letter-spacing: -1px;
  text-transform: uppercase;
`;

export const TitleAccent = styled.Text`
  color: #ed145b;
`;

export const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
`;

/* Campo de Busca */
export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #0a0a0e;
  border-width: 1px;
  border-color: rgba(237, 20, 91, 0.3);
  border-radius: 8px;
  height: 55px;
  padding-horizontal: 15px;
  margin-bottom: 30px;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.3)',
})`
  flex: 1;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

/* Grid de Gêneros */
export const GenreGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const GenreCard = styled.TouchableOpacity`
  width: ${cardWidth}px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #1a1a1a;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const GenreImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const CardOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 60%;
  justify-content: flex-end;
  padding: 15px;
`;

export const GenreTitle = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 0px 2px 4px rgba(0,0,0,0.5);
`;