import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/stylesTocandoAgora';
import { API_URL } from "../services/api";

// Controle local para evitar múltiplos likes na mesma sessão
const sessionLikes = new Set();

// ── Utilitário: monta URI sem barra dupla ──────────────────────────────────────
const buildUri = (base, path) => {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

// ── Player unificado: web usa HTMLAudioElement, nativo usa expo-av ─────────────
const createPlayer = async (uri, onFinish) => {
  if (Platform.OS === 'web') {
    const audio = new window.Audio();

    // Aguarda o áudio estar pronto antes de tentar reproduzir
    await new Promise((resolve, reject) => {
      audio.oncanplaythrough = resolve;
      audio.onerror = () => {
        const msg = audio.error?.message || 'Formato não suportado ou URL inválida';
        reject(new Error(`Falha ao carregar áudio: ${msg}`));
      };
      audio.src = uri;
      audio.load();
    });

    audio.onended = onFinish;
    await audio.play();

    return {
      pauseAsync:  () => audio.pause(),
      playAsync:   () => audio.play(),
      stopAsync:   () => { audio.pause(); audio.currentTime = 0; },
      unloadAsync: () => { audio.pause(); audio.src = ''; },
    };
  }

  // Nativo: expo-av
  const { Audio } = await import('expo-av');
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
  });
  const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) onFinish();
  });
  return {
    pauseAsync:  () => sound.pauseAsync(),
    playAsync:   () => sound.playAsync(),
    stopAsync:   () => sound.stopAsync(),
    unloadAsync: () => sound.unloadAsync(),
  };
};

export default function PlaylistScreen({ floor, onBack, onAddMusic }) {
  const [songs, setSongs]         = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError]         = useState(null);
  const playerRef                 = useRef(null);

  // ── Carrega playlist ────────────────────────────────────────────────────────
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

  // ── Play / Pause ────────────────────────────────────────────────────────────
  const handlePlay = async (item) => {
    setError(null);

    // Mesma música → toggle play/pause
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

    // Outra música → para a atual
    if (playerRef.current) {
      await playerRef.current.stopAsync();
      await playerRef.current.unloadAsync();
      playerRef.current = null;
    }

    const uri = buildUri(API_URL, item.path);
    console.log("Reproduzindo URI:", uri); // útil para debug — remova em produção

    try {
      const player = await createPlayer(uri, () => {
        setPlayingId(null);
        setIsPlaying(false);
      });
      playerRef.current = player;
      setPlayingId(item.playlist_id);
      setIsPlaying(true);
    } catch (err) {
      console.error("Erro ao reproduzir:", err);
      setError(`Não foi possível reproduzir "${item.title}". Verifique o formato do arquivo ou a conexão.`);
      setPlayingId(null);
      setIsPlaying(false);
    }
  };

  // ── Like ────────────────────────────────────────────────────────────────────
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

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <S.Container>
      <S.BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </S.BackButton>

      <S.Title>🎧 {floor}º andar</S.Title>

      {/* Mensagem de erro de reprodução */}
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
        data={songs}
        keyExtractor={(item) => String(item.playlist_id)}
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