import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/styleVibeSelection';

const genres = [
  { id: '1', name: 'Rock', img: require('../imgs/Rock.png') },
  { id: '2', name: 'Eletrônico', img: require('../imgs/Eletronico.png') },
  { id: '3', name: 'Sertanejo', img: require('../imgs/Sertanejo.png') },
  { id: '4', name: 'Funk', img: require('../imgs/Funk.png') },
  { id: '5', name: 'Rap', img: require('../imgs/Rap.png') },
  { id: '6', name: 'Samba', img: require('../imgs/Samba.png') },
];

const AnimatedCard = Animated.createAnimatedComponent(S.GenreCard);

export default function VibeSelectionScreen({ onSelectVibe, floor, currentVibe, onBack }) {
  const [search, setSearch] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Objeto para armazenar as referências das animações de cada card
  const scaleAnims = useRef(genres.reduce((acc, genre) => {
    acc[genre.name] = new Animated.Value(currentVibe === genre.name ? 1 : 0);
    return acc;
  }, {})).current;

  const filteredGenres = genres.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const hasResults = filteredGenres.length > 0;

  useEffect(() => {
    genres.forEach(genre => {
      const isSelected = currentVibe === genre.name;
      Animated.spring(scaleAnims[genre.name], {
        toValue: isSelected ? 1 : 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  }, [currentVibe]);

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

      <S.BackButtonContainer>
        <TouchableWithoutFeedback onPress={onBack}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <S.BackButtonCircle>
              <Ionicons name="chevron-back" size={28} color="#ed145b" />
            </S.BackButtonCircle>
            <S.BackText>Escolher outra sala</S.BackText>
          </View>
        </TouchableWithoutFeedback>
      </S.BackButtonContainer>

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
            />
          </S.SearchContainer>

          <S.GenreGrid>
            {hasResults ? (
              filteredGenres.map((item) => {
                const isSelected = currentVibe === item.name;

                const cardScale = scaleAnims[item.name].interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05]
                });

                const glowOpacity = scaleAnims[item.name].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                });

                return (
                  <AnimatedCard
                    key={item.id}
                    onPress={() => onSelectVibe(item.name)}
                    style={{
                      transform: [{ scale: cardScale }],
                      borderColor: isSelected ? '#ed145b' : 'rgba(255,255,255,0.05)',
                      shadowOpacity: glowOpacity
                    }}
                  >
                    <S.GenreImage source={item.img} />
                    <S.CardOverlay
                      colors={['transparent', isSelected ? 'rgba(237,20,91,0.9)' : 'rgba(0,0,0,0.9)']}
                    >
                      <S.GenreTitle>{item.name}</S.GenreTitle>
                      {isSelected && <S.ActiveMarker />}
                    </S.CardOverlay>
                  </AnimatedCard>
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