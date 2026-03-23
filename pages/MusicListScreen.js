import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/styleMusicList';
// IMPORTANDO O BANCO EXTERNO
import { MUSIC_DATABASE } from '../data/musicData';

export default function MusicListScreen({ floor, genre, onBack }) {
  // Busca as músicas baseada no andar e gênero recebidos por props
  const songs = MUSIC_DATABASE[`${floor}-${genre}`] || [{ id: '0', title: 'Em breve', artist: 'Playlist vazia' }];

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
          <S.MusicCard activeOpacity={0.7}>
            <S.MusicInfo>
              <S.SongName>{item.title}</S.SongName>
              <S.ArtistName>{item.artist}</S.ArtistName>
            </S.MusicInfo>
            <Ionicons name="play-outline" size={24} color="#ed145b" />
          </S.MusicCard>
        )}
      />
    </S.Container>
  );
}