import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  padding-horizontal: ${width * 0.08}px;
  justify-content: center;
`;

export const BackgroundGradient = styled(LinearGradient).attrs({
  colors: ['#000428', '#004e92', '#000428'],
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Header = styled.View`
  margin-bottom: ${height * 0.05}px;
`;

export const TitleText = styled.Text`
  color: #00d2ff;
  font-size: ${width * 0.045}px;
  font-weight: 300;
  letter-spacing: 8px;
  text-transform: uppercase;
`;

export const SubtitleText = styled.Text`
  color: #ffffff;
  font-size: ${width * 0.14}px;
  font-weight: 900;
  line-height: ${width * 0.15}px;
`;

export const NeonDivider = styled.View`
  width: 80px;
  height: 6px;
  background-color: #00d2ff;
  margin-top: 12px;
  border-radius: 3px;
  box-shadow: 0px 0px 10px #00d2ff;
  elevation: 15;
`;

export const MenuContainer = styled.View`
  gap: 20px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: rgba(255, 255, 255, 0.25);
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.03);
`;

export const RoomGradient = styled(LinearGradient).attrs({
  colors: ['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.02)'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  padding-vertical: ${height * 0.03}px;
  padding-horizontal: 25px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const RoomLabel = styled.Text`
  color: #ffffff;
  font-size: ${width * 0.045}px;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

export const StatusGlow = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #00d2ff;
  box-shadow: 0px 0px 12px #00d2ff;
  elevation: 12;
`;

// Css da responsividade desse componente (Auxiliar)
export const ResponsiveContainer = styled.View`
  flex-direction: column;
  padding: ${width < 380 ? '10px' : '20px'};
`;