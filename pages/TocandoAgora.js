import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Animated, Easing } from 'react-native';
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

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs] = useState([]);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada da tela
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Loop de pulsação do botão "+"
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1200,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
          useNativeDriver: true,
        }),
      ])
    ).start();

    fetch(`http://192.168.68.117:5000/playlist/${floor}`)
      .then(res => res.json())
      .then(data => {
        const updated = data.map(song => ({
          ...song,
          liked: !!likedSongs[song.song_id],
          likes: likedSongs[song.song_id] ? (song.likes || 0) + 1 : song.likes || 0
        }));
        setSongs(updated);
      })
      .catch(err => console.error("Erro ao buscar playlist:", err));
  }, [floor]);

  const handleLike = (songId) => {
    fetch(`http://192.168.68.117:5000/playlist/${songId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: true }),
    })
      .then(res => res.json())
      .then(() => {
        setSongs(prev => prev.map(s =>
          s.song_id === songId ? { ...s, likes: (s.likes || 0) + 1, liked: true } : s
        ));
        likedSongs[songId] = true;
      })
      .catch(err => console.error("Erro:", err));
  };

  const renderSong = ({ item, index }) => {
    const itemScale = new Animated.Value(0.9);
    Animated.spring(itemScale, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={{ transform: [{ scale: itemScale }] }}>
        <Card style={{
          borderLeftWidth: 4,
          borderLeftColor: item.liked ? '#ed145b' : 'transparent',
          shadowColor: '#ed145b',
          shadowOpacity: 0.1,
          shadowRadius: 10
        }}>
          <Row>
            <View>
              <SongTitle>{item.title}</SongTitle>
              <Artist>{item.artist}</Artist>
              <Genre style={{ opacity: 0.6 }}>{item.genre}</Genre>
            </View>
            <LikesContainer>
              <TouchableOpacity disabled={item.liked} onPress={() => handleLike(item.song_id)}>
                <Ionicons
                  name={item.liked ? "heart" : "heart-outline"}
                  size={22}
                  color={item.liked ? "#ed145b" : "#fff"}
                />
              </TouchableOpacity>
              <LikesText>{item.likes}</LikesText>
            </LikesContainer>
          </Row>
        </Card>
      </Animated.View>
    );
  };

  return (
    <Container as={Animated.View} style={{ opacity: fadeAnim }}>
      <BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={26} color="#ed145b" />
      </BackButton>

      <Title style={{ letterSpacing: 1 }}>
        🎧 NO AR: <Title style={{ color: '#ed145b' }}>{floor}º ANDAR</Title>
      </Title>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.song_id.toString()}
        renderItem={renderSong}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botão de Adição Radical */}
      <Animated.View style={{
        position: 'absolute',
        bottom: 40,
        right: 30,
        transform: [{ scale: pulseAnim }],
        shadowColor: "#ed145b",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 15
      }}>
        <TouchableOpacity
          style={{
            width: 65,
            height: 65,
            borderRadius: 32.5,
            backgroundColor: "#ed145b",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.4)"
          }}
          onPress={onAddMusic}
        >
          <Ionicons name="add" size={38} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
}
