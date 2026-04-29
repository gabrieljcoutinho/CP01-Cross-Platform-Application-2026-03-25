import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/stylesTocandoAgora';
import { API_URL } from "../services/api";

// Evita múltiplos likes na mesma sessão
const sessionLikes = new Set();

// Monta URL corretamente
const buildUri = (base, path) => {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

// Player unificado
const createPlayer = async (uri, onFinish) => {
  if (Platform.OS === 'web') {
    const audio = new window.Audio();

    await new Promise((resolve, reject) => {
      audio.oncanplaythrough = resolve;
      audio.onerror = () => reject(new Error('Erro ao carregar áudio'));
      audio.src = uri;
      audio.load();
    });

    audio.onended = onFinish;
    await audio.play();

    return {
      pauseAsync: () => audio.pause(),
      playAsync: () => audio.play(),
      stopAsync: () => { audio.pause(); audio.currentTime = 0; },
      unloadAsync: () => { audio.pause(); audio.src = ''; },
    };
  }

  const { Audio } = await import('expo-av');

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
  });

  const { sound } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: true }
  );

  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) onFinish();
  });

  return {
    pauseAsync: () => sound.pauseAsync(),
    playAsync: () => sound.playAsync(),
    stopAsync: () => sound.stopAsync(),
    unloadAsync: () => sound.unloadAsync(),
  };
};

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);

  const playerRef = useRef(null);

  // Filtro
  const filteredSongs = songs.filter((item) => {
    const text = `${item.title} ${item.artist} ${item.genre}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  // Carrega playlist
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

    return () => {
      playerRef.current?.unloadAsync();
    };
  }, [floor]);

  // Play/Pause
  const handlePlay = async (item) => {
    setError(null);

    if (playingId === item.playlist_id && playerRef.current) {
      if (isPlaying) {
        await playerRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await playerRef.current.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    if (playerRef.current) {
      await playerRef.current.stopAsync();
      await playerRef.current.unloadAsync();
      playerRef.current = null;
    }

    const uri = buildUri(API_URL, item.path);

    try {
      const player = await createPlayer(uri, () => {
        setPlayingId(null);
        setIsPlaying(false);
        setCurrentTrack(null);
      });

      playerRef.current = player;
      setPlayingId(item.playlist_id);
      setIsPlaying(true);
      setCurrentTrack(item);

    } catch (err) {
      console.error("Erro ao reproduzir:", err);
      setError(`Não foi possível reproduzir "${item.title}".`);
      setPlayingId(null);
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const handlePause = async () => {
    if (playerRef.current) {
      await playerRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const handleResume = async () => {
    if (playerRef.current) {
      await playerRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  // Like
  const handleLike = async (playlistId) => {
    if (sessionLikes.has(playlistId)) return;

    try {
      const response = await fetch(`${API_URL}/playlist/${playlistId}`, {
        method: 'PUT'
      });

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

      <S.SearchInput
        placeholder="Buscar música, artista ou gênero..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {error && (
        <View style={{
          backgroundColor: '#3a0010',
          borderRadius: 8,
          padding: 10,
          marginHorizontal: 16,
          marginBottom: 8,
        }}>
          <Text style={{ color: '#ff6b8a', fontSize: 13 }}>{error}</Text>
        </View>
      )}

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => String(item.playlist_id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => {
          const isCurrentTrack = playingId === item.playlist_id;

          return (
            <S.Card>
              <S.Row>
                <TouchableOpacity onPress={() => handlePlay(item)}>
                  <Ionicons
                    name={isCurrentTrack && isPlaying ? "pause-circle" : "play-circle"}
                    size={36}
                    color={isCurrentTrack ? "#ed145b" : "#555"}
                  />
                </TouchableOpacity>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <S.SongTitle style={{ color: isCurrentTrack ? '#ed145b' : '#fff' }}>
                    {item.title}
                  </S.SongTitle>
                  <S.Artist>{item.artist}</S.Artist>
                  <S.Genre>{item.genre}</S.Genre>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => handleLike(item.playlist_id)}>
                    <Ionicons
                      name="heart"
                      size={26}
                      color={sessionLikes.has(item.playlist_id) ? "#ed145b" : "#333"}
                    />
                  </TouchableOpacity>

                  <Text style={{ color: '#fff', fontSize: 12 }}>
                    {item.likes || 0}
                  </Text>
                </View>
              </S.Row>
            </S.Card>
          );
        }}
      />

      {/* MINI PLAYER */}
      {currentTrack && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: '#121212',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.1)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              {currentTrack.title}
            </Text>
            <Text style={{ color: '#aaa', fontSize: 12 }}>
              {currentTrack.artist}
            </Text>
          </View>

          <TouchableOpacity
            onPress={isPlaying ? handlePause : handleResume}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={28}
              color="#ed145b"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* BOTÃO ADD */}
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#ed145b",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 100,
          elevation: 10,
        }}
        onPress={onAddMusic}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>

    </S.Container>
  );
}