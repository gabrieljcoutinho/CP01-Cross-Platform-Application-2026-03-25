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

export default function VibeSelectionScreen({ onSelectVibe, floor, currentVibe }) {
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
            <S.TitleMain>Andar <S.TitleAccent>{floor}º</S.TitleAccent></S.TitleMain>
            <S.Subtitle>Selecione a playlist independente para este andar.</S.Subtitle>
          </S.HeaderSection>

          <S.SearchContainer>
            <S.SearchInput
              placeholder="Buscar gênero..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="rgba(255,255,255,0.2)"
            />
          </S.SearchContainer>

          <S.GenreGrid>
            {/* Css da responsividade desse componente: Grid adaptável */}
            {hasResults ? (
              filteredGenres.map((item) => {
                const isSelected = currentVibe === item.name;
                return (
                  <S.GenreCard
                    key={item.id}
                    onPress={() => onSelectVibe(item.name)}
                    style={{
                      borderColor: isSelected ? '#ed145b' : 'rgba(255,255,255,0.05)',
                      borderWidth: isSelected ? 2 : 1,
                      transform: [{ scale: isSelected ? 1.05 : 1 }]
                    }}
                  >
                    <S.GenreImage source={item.img} />
                    <S.CardOverlay colors={['transparent', isSelected ? 'rgba(237,20,91,0.8)' : 'rgba(0,0,0,0.9)']}>
                      <S.GenreTitle>{item.name}</S.GenreTitle>
                    </S.CardOverlay>
                  </S.GenreCard>
                );
              })
            ) : (
              <S.EmptyWrapper style={{ opacity: fadeAnim }}>
                <S.EmptyText>Nenhum resultado encontrado.</S.EmptyText>
              </S.EmptyWrapper>
            )}
          </S.GenreGrid>
        </S.ContentWrapper>
      </S.ScrollArea>
      <StatusBar style="light" />
    </S.Container>
  );
}