import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`flex: 1; background-color: #000;`;
export const MainBackground = styled(LinearGradient)`position: absolute; width: 100%; height: 100%;`;
export const Header = styled.View`padding: 60px 20px 20px; flex-direction: row; align-items: center; justify-content: space-between;`;
export const TitleMain = styled.Text`color: #fff; font-size: 24px; font-weight: bold;`;
export const TitleAccent = styled.Text`color: #ed145b;`;

export const MusicCard = styled.TouchableOpacity`
  margin: 10px 20px;
  padding: 15px;
  background-color: rgba(255,255,255,0.05);
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(237, 20, 91, 0.3);
`;

export const MusicInfo = styled.View`flex: 1;`;
export const SongName = styled.Text`color: #fff; font-size: 18px; font-weight: bold;`;
export const ArtistName = styled.Text`color: #aaa; font-size: 14px;`;