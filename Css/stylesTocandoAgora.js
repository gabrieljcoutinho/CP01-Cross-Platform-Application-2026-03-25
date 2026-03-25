import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
  padding: 20px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export const Card = styled.View`
  background-color: #1c1c1c;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const SongTitle = styled.Text`
  color: #ed145b;
  font-size: 18px;
  font-weight: bold;
`;

export const Artist = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Genre = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

export const Likes = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-top: 5px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;
`;
