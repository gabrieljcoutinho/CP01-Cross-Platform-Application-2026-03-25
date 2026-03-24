import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
// Aumentamos o recuo lateral para 35px de cada lado (Total 70px) + gap de 15px entre cards
const sidePadding = 35;
const gap = 15;
const cardWidth = (width - (sidePadding * 2) - gap) / 2;

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const MainBackground = styled(LinearGradient)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

export const BackButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 50px;
  padding-horizontal: ${sidePadding}px;
  position: absolute;
  top: 0;
  z-index: 100;
`;

export const BackButtonCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #0d0d12;
  border: 1px solid rgba(237, 20, 91, 0.5);
  justify-content: center;
  align-items: center;
`;

export const BackText = styled.Text`
  color: #ed145b;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-left: 15px;
  text-transform: uppercase;
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, paddingBottom: 60, paddingTop: 110 }
})`
  flex: 1;
`;

/* Css da responsividade: Centraliza o conteúdo afastando das bordas */
export const ContentWrapper = styled.View`
  padding-horizontal: ${sidePadding}px;
  align-items: center;
`;

export const HeaderSection = styled.View`
  margin-bottom: 35px;
  border-left-width: 4px;
  border-left-color: #ed145b;
  padding-left: 20px;
  align-self: flex-start;
`;

export const TitleMain = styled.Text`
  color: #ffffff;
  font-size: 40px;
  font-weight: 900;
  text-transform: uppercase;
`;

export const TitleAccent = styled.Text`
  color: #ed145b;
`;

export const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  margin-top: 10px;
  font-weight: 600;
`;

export const GenreGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const GenreCard = styled.TouchableOpacity`
  width: ${cardWidth}px;
  height: 240px;
  margin-bottom: 15px;
  background-color: #0a0a0f;
  border-radius: 12px;
  border-width: 2px;
  overflow: hidden;
  position: relative;
  elevation: 8;
  shadow-color: #ed145b;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

export const GenreImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.6;
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
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
  border-bottom-width: 3px;
  border-bottom-color: #ed145b;
  align-self: flex-start;
`;

export const ActiveMarker = styled.View`
  width: 10px;
  height: 10px;
  background-color: #ed145b;
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ed145b;
`;