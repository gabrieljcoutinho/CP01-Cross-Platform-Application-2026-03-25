import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const MainBackground = styled(LinearGradient)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

export const HeaderSection = styled.View`
  padding-top: ${height * 0.08}px;
  padding-horizontal: 30px;
  margin-bottom: 20px;
`;

export const GlitchContainer = styled.View`
  border-left-width: 4px;
  border-left-color: #ed145b;
  padding-left: 15px;
`;

export const TitleMain = styled.Text`
  color: #ed145b;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 6px;
`;

export const TitleSub = styled.Text`
  color: #ffffff;
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -1.5px;
`;

export const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

export const StatusPulse = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #ed145b;
`;

export const SystemText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-left: 10px;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;

export const MenuGrid = styled.View`
  padding: 25px;
  padding-bottom: 60px;
  gap: 15px;
`;

export const ButtonContainer = styled.View`
  height: 95px;
  width: 100%;
`;

export const GlowLayer = styled(Animated.View)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ed145b;
  border-radius: 4px;
`;

export const GlassCard = styled.View`
  flex: 1;
  background-color: #0a0a0e;
  border-width: 1px;
  border-color: rgba(237, 20, 91, 0.25);
  overflow: hidden;
  border-radius: 2px;
`;

export const ScanLine = styled(Animated.View)`
  position: absolute;
  width: ${width}px;
  height: 100%;
  background-color: rgba(237, 20, 91, 0.08);
`;

export const CardContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  /* Justify-content alterado para flex-start para alinhar à esquerda,
     já que o elemento da direita foi removido */
  justify-content: flex-start;
  padding-horizontal: 25px;
  z-index: 2;
`;

export const InfoArea = styled.View`
  justify-content: center;
`;

export const RoomIndex = styled.Text`
  color: #ed145b;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

export const RoomLabel = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
`;

/* LevelDisplay, LevelNumber e LevelDecoration foram removidos */