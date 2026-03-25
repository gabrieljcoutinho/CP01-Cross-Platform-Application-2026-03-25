import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Title,
  Card,
  SongTitle,
  Artist,
  Genre,
  Likes,
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
      <SongTitle>{item.title}</SongTitle>
      <Artist>{item.artist}</Artist>
      <Genre>{item.genre}</Genre>
      <Likes>❤️ {item.likes}</Likes>
    </Card>
  );

  return (
    <Container>
      <Title>Tocando agora no {floor}º andar 🎵</Title>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.song_id.toString()}
        renderItem={renderSong}
      />

      <BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </BackButton>
    </Container>
  );
}
