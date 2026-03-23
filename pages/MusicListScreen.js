import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'; // Importa o áudio
import * as S from '../Css/styleMusicList';
import { MUSIC_DATABASE } from '../data/musicData';

export default function MusicListScreen({ floor, genre, onBack }) {
  const [sound, setSound] = useState();
  const [playingId, setPlayingId] = useState(null);

  const songs = MUSIC_DATABASE[`${floor}-${genre}`] || [];

  async function playSound(item) {
    // Se já tiver um som carregado, para ele antes de iniciar o próximo
    if (sound) {
      await sound.unloadAsync();
    }

    // Se clicar na que já está tocando, ela apenas para
    if (playingId === item.id) {
      setPlayingId(null);
      return;
    }

    // Carrega e toca a nova música
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: item.url }, // Usa a URL do seu MUSIC_DATABASE
      { shouldPlay: true }
    );

    setSound(newSound);
    setPlayingId(item.id);

    // Quando a música acabar, reseta o ícone
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setPlayingId(null);
      }
    });
  }

  // Limpa a memória e para a música ao sair da tela (Back)
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <S.Container>
      <S.MainBackground colors={['#000', '#ed145b20']} />

      <S.Header>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="close-circle" size={40} color="#ed145b" />
        </TouchableOpacity>
        <S.TitleMain>
          {genre} <S.TitleAccent>Andar {floor}º</S.TitleAccent>
        </S.TitleMain>
      </S.Header>

      <FlatList
        data={songs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <S.MusicCard
            activeOpacity={0.7}
            onPress={() => playSound(item)}
            style={{ borderColor: playingId === item.id ? '#ed145b' : 'transparent', borderWidth: 1 }}
          >
            <S.MusicInfo>
              <S.SongName style={{ color: playingId === item.id ? '#ed145b' : '#fff' }}>
                {item.title}
              </S.SongName>
              <S.ArtistName>{item.artist}</S.ArtistName>
            </S.MusicInfo>

            <Ionicons
              name={playingId === item.id ? "pause-circle" : "play-outline"}
              size={30}
              color={playingId === item.id ? "#ed145b" : "#fff"}
            />
          </S.MusicCard>
        )}
      />
    </S.Container>
  );
}