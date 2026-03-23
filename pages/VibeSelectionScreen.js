import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as S from '../Css/styleVibeSelection';

const genres = [
  { id: '1', name: 'Rock', img: require('../imgs/Rock.png') },
  { id: '2', name: 'Eletrônico', img: require('../imgs/Eletronico.png') },
  { id: '3', name: 'Sertanejo', img: require('../imgs/Sertanejo.png') },
  { id: '4', name: 'Funk', img: require('../imgs/Funk.png') },
  { id: '5', name: 'Rap', img: require('../imgs/Rap.png') },
  { id: '6', name: 'Samba', img: require('../imgs/Samba.png') },
];

export default function VibeSelectionScreen({ onSelectVibe }) {
  const [search, setSearch] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const filteredGenres = genres.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const hasResults = filteredGenres.length > 0;

  useEffect(() => {
    if (!hasResults) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.spring(fadeAnim, { toValue: 1, friction: 4, useNativeDriver: true })
      ]).start();
    }
  }, [hasResults]);

  return (
    <S.Container>
      <S.MainBackground
        colors={['#000000', '#08080c', '#ed145b15']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <S.ScrollArea>
        <S.ContentWrapper>
          <S.HeaderSection>
            <S.TitleMain>Choose your{"\n"}<S.TitleAccent>Vibe</S.TitleAccent></S.TitleMain>
            <S.Subtitle>
              Selecione o som que define a frequência deste andar.
              Sua escolha influencia a playlist ao vivo.
            </S.Subtitle>
          </S.HeaderSection>

          <S.SearchContainer>
            <S.SearchInput
              placeholder="Buscar gênero musical..."
              value={search}
              onChangeText={setSearch}
            />
          </S.SearchContainer>

          <S.GenreGrid>
            {hasResults ? (
              filteredGenres.map((item) => (
                <S.GenreCard
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => console.log(item.name)}
                >
                  <S.GenreImage source={item.img} resizeMode="cover" />
                  <S.CardOverlay colors={['transparent', 'rgba(0,0,0,0.9)']}>
                    <S.GenreTitle>{item.name}</S.GenreTitle>
                  </S.CardOverlay>
                </S.GenreCard>
              ))
            ) : (
              <S.EmptyWrapper style={{ opacity: fadeAnim, transform: [{ scale: fadeAnim }] }}>
                <S.EmptyGlitchLine />
                <S.EmptyText>Esse estilo musical não tem.</S.EmptyText>
                <S.EmptyTextSub>Tente uma nova frequência de busca</S.EmptyTextSub>
                <S.EmptyGlitchLine />
              </S.EmptyWrapper>
            )}
          </S.GenreGrid>
        </S.ContentWrapper>
      </S.ScrollArea>
      <StatusBar style="light" />
    </S.Container>
  );
}