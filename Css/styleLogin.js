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

export const ContentWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  padding-horizontal: 30px;
`;

export const HeaderSection = styled.View`
  margin-bottom: 40px;
  border-left-width: 4px;
  border-left-color: #ed145b;
  padding-left: 15px;
`;

export const LoginTitle = styled.Text`
  color: #ffffff;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -1px;
`;

export const LoginSubtitle = styled.Text`
  color: #ed145b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
  height: 65px;
  background-color: #0a0a0e;
  border-width: 1px;
  border-color: rgba(237, 20, 91, 0.3);
  border-radius: 4px;
  padding-horizontal: 15px;
  justify-content: center;
`;

export const Label = styled.Text`
  color: #ed145b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 2px;
  text-transform: uppercase;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.2)',
})`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

export const LoginButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #ed145b;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  box-shadow: 0px 0px 15px rgba(237, 20, 91, 0.5);
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const FooterLink = styled.TouchableOpacity`
  margin-top: 25px;
  align-items: center;
`;

export const FooterText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-weight: 600;
`;