import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/stylesTocandoAgora';

const likedSongs = {};

export default function PlaylistScreen({ floor, onBack, onAddMusic, newMusic, onClearNewMusic }) {
  const [songs, setSongs] = useState([]);

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
      .catch(err => console.error(err));
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

  return (
    <S.Container>
      <S.BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </S.BackButton>

      <S.Title>🎧 {floor}º andar</S.Title>

      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <S.Card>
            <S.Row>
              <View>
                <S.SongTitle>{item.title}</S.SongTitle>
                <S.Artist>{item.artist}</S.Artist>
                <S.Genre>{item.genre}</S.Genre>
              </View>
              <S.LikesContainer>
                <TouchableOpacity disabled={item.liked} onPress={() => handleLike(item.song_id)}>
                  <Ionicons name="heart" size={18} color={item.liked ? "#aaa" : "#ed145b"} />
                </TouchableOpacity>
                <S.LikesText>{item.likes}</S.LikesText>
              </S.LikesContainer>
            </S.Row>
          </S.Card>
        )}
      />

      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#ed145b",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 20
        }}
        onPress={onAddMusic}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </S.Container>
  );
}

// Css da responsividade desse componente
/* Utilize max-width para os cards em telas maiores */