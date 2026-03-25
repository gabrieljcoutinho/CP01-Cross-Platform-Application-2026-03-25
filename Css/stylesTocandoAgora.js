import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #0d0d0d;
  padding: 20px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 60px 0 25px;
  text-align: center;
  letter-spacing: 1px;
`;

export const Card = styled.View`
  background-color: #1a1a1a;
  padding: 18px;
  border-radius: 16px;
  margin-bottom: 15px;

  border: 1px solid rgba(255,255,255,0.05);

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 6px;
  elevation: 6;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SongTitle = styled.Text`
  color: #ed145b;
  font-size: 18px;
  font-weight: bold;
`;

export const Artist = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-top: 3px;
`;

export const Genre = styled.Text`
  color: #888;
  font-size: 13px;
  margin-top: 2px;
`;

export const LikesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(237,20,91,0.1);
  padding: 6px 10px;
  border-radius: 20px;
`;

export const LikesText = styled.Text`
  color: #fff;
  margin-left: 6px;
  font-size: 14px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;

  background-color: rgba(255,255,255,0.1);
  padding: 10px;
  border-radius: 50px;
`;