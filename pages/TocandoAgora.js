import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Title,
  Card,
  SongTitle,
  Artist,
  Genre,
  Row,
  LikesContainer,
  LikesText,
  BackButton
} from '../Css/stylesTocandoAgora';

export default function PlaylistScreen({ floor, onBack }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.68.117:5000/playlist/${floor}`)
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error("Erro ao buscar playlist:", err));
  }, [floor]);

  const renderSong = ({ item }) => (
    <Card>
      <Row>
        <View>
          <SongTitle>{item.title}</SongTitle>
          <Artist>{item.artist}</Artist>
          <Genre>{item.genre}</Genre>
        </View>

        <LikesContainer>
          <Ionicons name="heart" size={18} color="#ed145b" />
          <LikesText>{item.likes}</LikesText>
        </LikesContainer>
      </Row>
    </Card>
  );

  return (
    <Container>
      <BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </BackButton>

      <Title>🎧 Tocando no {floor}º andar</Title>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.song_id.toString()}
        renderItem={renderSong}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}