import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const cardWidth = (width - 65) / 2;

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const MainBackground = styled(LinearGradient)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, paddingBottom: 60 }
})`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  padding-horizontal: 25px;
  padding-top: 60px;
`;

export const HeaderSection = styled.View`
  margin-bottom: 35px;
  border-left-width: 4px;
  border-left-color: #ed145b;
  padding-left: 20px;
`;

export const TitleMain = styled.Text`
  color: #ffffff;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 42px;
  text-transform: uppercase;
`;

export const TitleAccent = styled.Text`
  color: #ed145b;
`;

export const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  line-height: 19px;
  margin-top: 15px;
  font-weight: 600;
  max-width: 85%;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #0d0d12;
  border: 1px solid rgba(237, 20, 91, 0.3);
  border-left-width: 10px;
  border-left-color: #ed145b;
  height: 70px;
  padding-horizontal: 20px;
  margin-bottom: 40px;
  shadow-color: #ed145b;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
  elevation: 15;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.15)',
})`
  flex: 1;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

/* Css da responsividade desse componente */
export const GenreGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  min-height: 250px;
`;

export const GenreCard = styled.TouchableOpacity`
  width: ${cardWidth}px;
  height: 240px;
  margin-bottom: 15px;
  background-color: #0a0a0f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const GenreImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.7;
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
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 5px;
  border-bottom-width: 4px;
  border-bottom-color: #ed145b;
  align-self: flex-start;
`;

/* Estilos de Erro / Empty State Radical */
export const EmptyWrapper = styled(Animated.View)`
  width: 100%;
  padding: 50px 20px;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: rgba(237, 20, 91, 0.2);
  background-color: rgba(237, 20, 91, 0.02);
`;

export const EmptyText = styled.Text`
  color: #ed145b;
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0px 0px 15px rgba(237, 20, 91, 0.5);
`;

export const EmptyTextSub = styled.Text`
  color: rgba(255, 255, 255, 0.3);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 8px;
  letter-spacing: 2px;
`;

export const EmptyGlitchLine = styled.View`
  width: 60px;
  height: 2px;
  background-color: #ed145b;
  margin: 20px 0;
  opacity: 0.6;
`;