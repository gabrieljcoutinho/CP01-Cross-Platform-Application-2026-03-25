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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const HeaderSection = styled.View`
  padding-top: ${height * 0.08}px;
  padding-horizontal: 30px;
  margin-bottom: 25px;
`;

export const GlitchContainer = styled.View`
  border-left-width: 5px;
  border-left-color: #ed145b;
  padding-left: 15px;
`;

export const TitleMain = styled.Text`
  color: #ed145b;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 8px;
`;

export const TitleSub = styled.Text`
  color: #ffffff;
  font-size: 55px;
  font-weight: 900;
  letter-spacing: -2px;
`;

export const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
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
  letter-spacing: 2px;
  margin-left: 10px;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;

export const MenuGrid = styled.View`
  padding: 25px;
  gap: 15px;
`;

export const ButtonContainer = styled.View`
  height: 100px;
  width: 100%;
`;

export const GlowLayer = styled(Animated.View)`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-color: #ed145b;
  border-radius: 4px;
`;

export const GlassCard = styled.View`
  flex: 1;
  background-color: #080808;
  border-width: 1px;
  border-color: rgba(237, 20, 91, 0.5);
  overflow: hidden;
`;

export const CardContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;

export const LevelIndicator = styled.View`
  width: 60px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-right-color: rgba(237, 20, 91, 0.3);
  margin-right: 20px;
`;

export const LevelNumber = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: 900;
`;

export const LevelUnit = styled.Text`
  color: #ed145b;
  font-size: 10px;
  font-weight: 800;
  margin-top: -5px;
`;

export const InfoArea = styled.View`
  flex: 1;
`;

export const RoomIndex = styled.Text`
  color: #ed145b;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 2px;
`;

export const RoomLabel = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
`;

export const TechStatus = styled.Text`
  color: #888;
  font-size: 9px;
  font-weight: 600;
  margin-top: 4px;
`;

export const ActionCircle = styled.View`
  width: 30px;
  height: 30px;
  border-width: 1px;
  border-color: #ed145b;
  transform: rotate(45deg);
  align-items: center;
  justify-content: center;
`;

export const InnerCircle = styled.View`
  width: 6px;
  height: 6px;
  background-color: #ed145b;
`;

export const ScanningLine = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 20px;
  background-color: rgba(237, 20, 91, 0.1);
  border-bottom-width: 1px;
  border-bottom-color: #ed145b;
  z-index: 10;
`;