import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/stylesTocandoAgora';
import { API_URL } from "../services/api";

// Controle local para evitar múltiplos likes na mesma sessão
const sessionLikes = new Set();

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs] = useState([]);

  const loadPlaylist = async () => {
    try {
      const response = await fetch(`${API_URL}/playlist/${floor}`);
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      console.error("Erro ao carregar playlist:", err);
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, [floor]);

  const handleLike = async (playlistId) => {
    if (sessionLikes.has(playlistId)) return;

    try {
      // Método PUT usando o playlist_id único do objeto na playlist
      const response = await fetch(`${API_URL}/playlist/${playlistId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        sessionLikes.add(playlistId);
        loadPlaylist(); // Recarrega para atualizar os contadores
      }
    } catch (err) {
      console.error("Erro ao processar like:", err);
    }
  };

  return (
    <S.Container>
      <S.BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </S.BackButton>

      <S.Title>🎧 {floor}º andar</S.Title>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.playlist_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <S.Card>
            <S.Row>
              <View style={{ flex: 1 }}>
                <S.SongTitle>{item.title}</S.SongTitle>
                <S.Artist>{item.artist}</S.Artist>
                <S.Genre>{item.genre}</S.Genre>
              </View>

              <View style={{ alignItems: 'center', minWidth: 40 }}>
                <TouchableOpacity onPress={() => handleLike(item.playlist_id)}>
                  <Ionicons
                    name="heart"
                    size={26}
                    color={sessionLikes.has(item.playlist_id) ? "#ed145b" : "#333"}
                  />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 12, marginTop: 2 }}>
                  {item.likes || 0}
                </Text>
              </View>
            </S.Row>
          </S.Card>
        )}
      />

      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#ed145b",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 35,
          elevation: 10,
          shadowColor: "#ed145b",
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 }
        }}
        onPress={onAddMusic}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>
    </S.Container>
  );
}

// Css da responsividade desse componente
// Garanta que o FlatList tenha contentContainerStyle={{ paddingBottom: 100 }} para não cobrir o último item