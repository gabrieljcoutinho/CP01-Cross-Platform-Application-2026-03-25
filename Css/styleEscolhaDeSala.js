import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const isSmall = width < 380;

export const Container = styled.View`
  flex: 1;
  background-color: #020b1a;
`;

export const MainBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const GridOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  border-left-width: 1px;
  border-color: #00d2ff;
`;

export const HeaderSection = styled.View`
  padding-top: ${height * 0.08}px;
  padding-horizontal: 30px;
  margin-bottom: 30px;
`;

export const GlitchContainer = styled.View`
  position: relative;
`;

export const TitleMain = styled.Text`
  color: #00d2ff;
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 12px;
`;

export const TitleSub = styled.Text`
  color: #ffffff;
  font-size: 52px;
  font-weight: 900;
  margin-top: -5px;
  letter-spacing: -2px;
`;

export const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

export const StatusPulse = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #00ff88;
  margin-right: 10px;
`;

export const SystemText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  letter-spacing: 2px;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
  padding-horizontal: 25px;
`;

export const MenuGrid = styled.View`
  gap: 25px;
  padding-bottom: 50px;
`;

export const ButtonContainer = styled.View`
  height: ${isSmall ? '100px' : '120px'};
  width: 100%;
  position: relative;
`;

export const GlowLayer = styled(Animated.View)`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-color: #00d2ff;
  border-radius: 24px;
`;

export const GlassCard = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  justify-content: center;
`;

export const CardContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 30px;
`;

export const RoomIndex = styled.Text`
  color: #00d2ff;
  font-size: 12px;
  font-weight: 800;
  opacity: 0.8;
`;

export const RoomLabel = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const ActionCircle = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  border-width: 1px;
  border-color: #00d2ff;
  align-items: center;
  justify-content: center;
`;

export const InnerCircle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #00d2ff;
`;

export const ScanningLine = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(0, 210, 255, 0.4);
`;