import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 70) / 2;

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const MainBackground = styled(LinearGradient)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, paddingBottom: 40 }
})`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  padding-horizontal: 25px;
  padding-top: 60px;
`;

export const HeaderSection = styled.View`
  margin-bottom: 25px;
  border-left-width: 5px;
  border-left-color: #ed145b;
  padding-left: 20px;
`;

export const TitleMain = styled.Text`
  color: #ffffff;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export const TitleAccent = styled.Text`
  color: #ed145b;
`;

export const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  line-height: 18px;
  margin-top: 12px;
  font-weight: 600;
`;

/* Input de busca com borda neon radical */
export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #0d0d12;
  border: 1px solid rgba(237, 20, 91, 0.4);
  border-left-width: 8px;
  border-left-color: #ed145b;
  border-radius: 4px;
  height: 65px;
  padding-horizontal: 20px;
  margin-bottom: 30px;
  elevation: 10;
  shadow-color: #ed145b;
  shadow-opacity: 0.2;
  shadow-radius: 15px;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.2)',
})`
  flex: 1;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
`;

/* Css da responsividade desse componente */
export const GenreGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const GenreCard = styled.TouchableOpacity`
  width: ${cardWidth}px;
  height: 220px;
  margin-bottom: 20px;
  border-radius: 2px;
  overflow: hidden;
  background-color: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const GenreImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.8;
`;

export const CardOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 100%;
  justify-content: flex-end;
  padding: 15px;
`;

export const GenreTitle = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom-width: 3px;
  border-bottom-color: #ed145b;
  align-self: flex-start;
`;