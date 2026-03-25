import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/stylesTocandoAgora';

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs] = useState([]);

  const loadPlaylist = () => {
    fetch(`http://192.168.68.117:5000/playlist/${floor}`)
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error("Erro ao buscar playlist:", err));
  };

  useEffect(() => {
    loadPlaylist();
  }, [floor]);

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
            </S.Row>
          </S.Card>
        )}
      />

      <TouchableOpacity
        style={{
          width: 55,
          height: 55,
          borderRadius: 27.5,
          backgroundColor: "#ed145b",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 30,
          elevation: 5
        }}
        onPress={onAddMusic}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>
    </S.Container>
  );
}

