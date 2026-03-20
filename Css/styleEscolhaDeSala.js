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
  inset: 0;
`;

export const GridOverlay = styled.View`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: #ed145b;
`;

export const HeaderSection = styled.View`
  padding-top: ${height * 0.07}px;
  padding-horizontal: 25px;
  margin-bottom: 20px;
`;

export const GlitchContainer = styled.View`
  border-left-width: 4px;
  border-left-color: #ed145b;
  padding-left: 15px;
`;

export const TitleMain = styled.Text`
  color: #ed145b;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 5px;
`;

export const TitleSub = styled.Text`
  color: #ffffff;
  font-size: 58px;
  font-weight: 900;
  line-height: 60px;
  letter-spacing: -2px;
`;

export const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  padding-left: 20px;
`;

export const StatusPulse = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #ed145b;
  box-shadow: 0px 0px 8px #ed145b;
`;

export const SystemText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 9px;
  letter-spacing: 1.5px;
  margin-left: 10px;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;

export const MenuGrid = styled.View`
  padding: 25px;
  gap: 20px;
`;

export const ButtonContainer = styled.View`
  height: 110px;
  width: 100%;
`;

export const GlowLayer = styled(Animated.View)`
  position: absolute;
  inset: -1px;
  background-color: #ed145b;
  border-radius: 12px;
  opacity: 0.5;
`;

export const GlassCard = styled.View`
  flex: 1;
  background-color: #111;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(237, 20, 91, 0.3);
  overflow: hidden;
`;

export const CardContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 25px;
`;

export const RoomIndex = styled.Text`
  color: #ed145b;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
`;

export const RoomLabel = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const TechStatus = styled.Text`
  color: #00ff88;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
  opacity: 0.7;
`;

export const ActionCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
  transform: rotate(45deg);
  align-items: center;
  justify-content: center;
`;

export const InnerCircle = styled.View`
  width: 8px;
  height: 8px;
  background-color: #ed145b;
`;

export const ScanningLine = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 40px;
  background-color: rgba(237, 20, 91, 0.05);
  border-bottom-width: 1px;
  border-bottom-color: rgba(237, 20, 91, 0.5);
`;