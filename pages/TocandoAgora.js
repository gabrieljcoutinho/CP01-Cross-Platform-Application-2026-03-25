import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
  Easing
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/stylesTocandoAgora';
import { API_URL } from "../services/api";

// evita múltiplos likes na sessão
const sessionLikes = new Set();

// monta URL
const buildUri = (base, path) => {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

// player unificado
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

  // 🔥 animações por item (CORRETO)
  const animationsRef = useRef({});

  const getAnimation = (id) => {
    if (!animationsRef.current[id]) {
      animationsRef.current[id] = {
        scale: new Animated.Value(1),
        bars: [
          new Animated.Value(5),
          new Animated.Value(10),
          new Animated.Value(7),
        ],
      };
    }
    return animationsRef.current[id];
  };

  // controla animação SOMENTE do item atual
  useEffect(() => {
    if (!playingId) return;

    const anim = getAnimation(playingId);

    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim.scale, {
            toValue: 1.15,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(anim.scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      anim.bars.forEach((bar, i) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bar, {
              toValue: 25,
              duration: 300 + i * 100,
              useNativeDriver: false,
            }),
            Animated.timing(bar, {
              toValue: 5,
              duration: 300 + i * 100,
              useNativeDriver: false,
            }),
          ])
        ).start();
      });
    } else {
      anim.scale.setValue(1);
      anim.bars.forEach(bar => bar.setValue(5));
    }
  }, [isPlaying, playingId]);

  // filtro
  const filteredSongs = songs.filter((item) => {
    const text = `${item.title} ${item.artist} ${item.genre}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  // playlist
  const loadPlaylist = async () => {
    try {
      const response = await fetch(`${API_URL}/playlist/${floor}`);
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPlaylist();
    return () => playerRef.current?.unloadAsync();
  }, [floor]);

  // play
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
      setError(`Não foi possível reproduzir "${item.title}".`);
      setPlayingId(null);
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const handlePause = async () => {
    await playerRef.current?.pauseAsync();
    setIsPlaying(false);
  };

  const handleResume = async () => {
    await playerRef.current?.playAsync();
    setIsPlaying(true);
  };

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
      console.error(err);
    }
  };

  return (
    <S.Container>

      <S.BackButton onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </S.BackButton>

      <S.Title>🎧 {floor}º andar</S.Title>

      <S.SearchInput
        placeholder="Buscar música..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {error && (
        <View style={{ backgroundColor: '#3a0010', padding: 10, margin: 10, borderRadius: 8 }}>
          <Text style={{ color: '#ff6b8a' }}>{error}</Text>
        </View>
      )}

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => String(item.playlist_id)}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => {
          const isCurrent = playingId === item.playlist_id;
          const anim = getAnimation(item.playlist_id);

          return (
            <S.Card>
              <S.Row>

                {/* play */}
                <TouchableOpacity onPress={() => handlePlay(item)}>
                  <Animated.View
                    style={{
                      transform: [
                        { scale: isCurrent && isPlaying ? anim.scale : 1 }
                      ]
                    }}
                  >
                    <Ionicons
                      name={isCurrent && isPlaying ? "pause-circle" : "play-circle"}
                      size={36}
                      color={isCurrent ? "#ed145b" : "#555"}
                    />
                  </Animated.View>
                </TouchableOpacity>

                {/* infos */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <S.SongTitle style={{ color: isCurrent ? '#ed145b' : '#fff' }}>
                    {item.title}
                  </S.SongTitle>

                  <S.Artist>{item.artist}</S.Artist>
                  <S.Genre>{item.genre}</S.Genre>

                  {/* equalizer FIXADO (não empurra layout) */}
                  {isCurrent && isPlaying && (
                    <View style={{ flexDirection: 'row', marginTop: 6, height: 20, alignItems: 'flex-end' }}>
                      {anim.bars.map((bar, i) => (
                        <View key={i} style={{ height: 20, justifyContent: 'flex-end' }}>
                          <Animated.View
                            style={{
                              width: 3,
                              height: bar,
                              backgroundColor: '#ed145b',
                              marginRight: 3,
                              borderRadius: 2,
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* like */}
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

      {/* mini player */}
      {currentTrack && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: '#121212',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff' }}>{currentTrack.title}</Text>
            <Text style={{ color: '#aaa', fontSize: 12 }}>{currentTrack.artist}</Text>
          </View>

          <TouchableOpacity onPress={isPlaying ? handlePause : handleResume}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#ed145b" />
          </TouchableOpacity>
        </View>
      )}

      {/* add music */}
      <TouchableOpacity
        onPress={onAddMusic}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#ed145b",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 100,
        }}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>

    </S.Container>
  );
}