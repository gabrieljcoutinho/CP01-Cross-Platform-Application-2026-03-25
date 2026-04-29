import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as S from '../Css/stylesTocandoAgora';
import { API_URL } from "../services/api";

// Controle local para evitar múltiplos likes na mesma sessão
const sessionLikes = new Set();

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs]         = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef                  = useRef(null);

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
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [floor]);

  const handlePlay = async (item) => {
    if (playingId === item.playlist_id && soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    // URI aponta para o Flask: http://IP:5000/music/Rock/thefirsttime.mp3
    const uri = `${API_URL}/${item.path}`;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setPlayingId(item.playlist_id);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingId(null);
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error("Erro ao reproduzir:", err);
    }
  };

  const handleLike = async (playlistId) => {
    if (sessionLikes.has(playlistId)) return;
    try {
      const response = await fetch(`${API_URL}/playlist/${playlistId}`, { method: 'PUT' });
      if (response.ok) {
        sessionLikes.add(playlistId);
        loadPlaylist();
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
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const isCurrentTrack = playingId === item.playlist_id;
          return (
            <S.Card>
              <S.Row>
                <TouchableOpacity onPress={() => handlePlay(item)} style={{ marginRight: 12 }}>
                  <Ionicons
                    name={isCurrentTrack && isPlaying ? "pause-circle" : "play-circle"}
                    size={36}
                    color={isCurrentTrack ? "#ed145b" : "#555"}
                  />
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <S.SongTitle style={{ color: isCurrentTrack ? '#ed145b' : '#fff' }}>
                    {item.title}
                  </S.SongTitle>
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
          );
        }}
      />

      <TouchableOpacity
        style={{
          width: 60, height: 60, borderRadius: 30,
          backgroundColor: "#ed145b",
          alignItems: "center", justifyContent: "center",
          alignSelf: "center", marginBottom: 35,
          elevation: 10, shadowColor: "#ed145b",
          shadowOpacity: 0.5, shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        }}
        onPress={onAddMusic}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>
    </S.Container>
  );
}