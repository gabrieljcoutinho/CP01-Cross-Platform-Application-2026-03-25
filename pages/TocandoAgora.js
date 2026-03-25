import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
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

// objeto global em memória (não persiste se fechar o app)
const likedSongs = {};

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.68.117:5000/playlist/${floor}`)
      .then(res => res.json())
      .then(data => {
        // aplica likes já dados anteriormente
        const updated = data.map(song => ({
          ...song,
          liked: !!likedSongs[song.song_id],
          likes: likedSongs[song.song_id]
            ? (song.likes || 0) + 1
            : song.likes || 0
        }));
        setSongs(updated);
      })
      .catch(err => console.error("Erro ao buscar playlist:", err));
  }, [floor]);

  const handleLike = (songId) => {
    fetch(`http://192.168.68.117:5000/playlist/${songId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: true }),
    })
      .then(res => res.json())
      .then(() => {
        setSongs(prevSongs =>
          prevSongs.map(song =>
            song.song_id === songId
              ? { ...song, likes: (song.likes || 0) + 1, liked: true }
              : song
          )
        );
        likedSongs[songId] = true; // salva em memória
      })
      .catch(err => console.error("Erro ao adicionar like:", err));
  };

  const renderSong = ({ item }) => (
    <Card>
      <Row>
        <View>
          <SongTitle>{item.title}</SongTitle>
          <Artist>{item.artist}</Artist>
          <Genre>{item.genre}</Genre>
        </View>

        <LikesContainer>
          <TouchableOpacity
            disabled={item.liked}
            onPress={() => handleLike(item.song_id)}
          >
            <Ionicons
              name="heart"
              size={18}
              color={item.liked ? "#aaa" : "#ed145b"}
            />
          </TouchableOpacity>
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

      <Title>🎧 {floor}º andar</Title>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.song_id.toString()}
        renderItem={renderSong}
        showsVerticalScrollIndicator={false}
      />

      {/* 🔥 Botão redondo com símbolo "+" */}
      <TouchableOpacity
        style={{
          marginTop: 15,
          width: 45,
          height: 45,
          borderRadius: 22.5,
          backgroundColor: "#ed145b",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
        onPress={onAddMusic}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </Container>
  );
}
