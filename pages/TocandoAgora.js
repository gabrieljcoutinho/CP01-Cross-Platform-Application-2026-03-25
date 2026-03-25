import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Animated } from 'react-native';
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

const likedSongs = {};

export default function PlaylistScreen({ floor, onBack, onAddMusic, newMusic, onClearNewMusic }) {
  const [songs, setSongs] = useState([]);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    fetch(`http://192.168.68.117:5000/playlist/${floor}`)
      .then(res => res.json())
      .then(data => {
        const updated = data.map(song => ({
          ...song,
          liked: !!likedSongs[song.song_id],
          likes: likedSongs[song.song_id] ? (song.likes || 0) + 1 : song.likes || 0
        }));
        setSongs(updated);

        if (newMusic) {
          handlePostNewMusic(newMusic);
        }
      })
      .catch(err => console.error("Erro ao buscar playlist:", err));
  }, [floor, newMusic]);

  const handlePostNewMusic = (music) => {
    fetch(`http://192.168.68.117:5000/playlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...music, floor })
    })
    .then(() => {
      setSongs(prev => [music, ...prev]);
      onClearNewMusic();
    })
    .catch(err => console.error(err));
  };

  const handleLike = (songId) => {
    fetch(`http://192.168.68.117:5000/playlist/${songId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: true }),
    })
    .then(() => {
      setSongs(prev => prev.map(s => s.song_id === songId ? { ...s, likes: (s.likes || 0) + 1, liked: true } : s));
      likedSongs[songId] = true;
    });
  };

  const startPulse = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.spring(pulseAnim, { toValue: 1, friction: 3, useNativeDriver: true })
    ]).start();
    onAddMusic();
  };

  return (
    <Container>
      <BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </BackButton>

      <Title>🎧 {floor}º andar</Title>

      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card>
            <Row>
              <View>
                <SongTitle>{item.title}</SongTitle>
                <Artist>{item.artist}</Artist>
                <Genre>{item.genre}</Genre>
              </View>
              <LikesContainer>
                <TouchableOpacity disabled={item.liked} onPress={() => handleLike(item.song_id)}>
                  <Ionicons name="heart" size={18} color={item.liked ? "#aaa" : "#ed145b"} />
                </TouchableOpacity>
                <LikesText>{item.likes}</LikesText>
              </LikesContainer>
            </Row>
          </Card>
        )}
      />

      <Animated.View style={{ transform: [{ scale: pulseAnim }], alignSelf: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#ed145b",
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
            shadowColor: "#ed145b",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 10
          }}
          onPress={startPulse}
        >
          <Ionicons name="add" size={35} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
}

// Css da responsividade desse componente
/* Utilize o FlatList com contentContainerStyle para garantir padding em telas menores. */