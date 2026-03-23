import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
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
  const scaleAnims = useRef(genres.reduce((acc, g) => ({ ...acc, [g.name]: new Animated.Value(0) }), {})).current;

  useEffect(() => {
    genres.forEach(genre => {
      Animated.spring(scaleAnims[genre.name], {
        toValue: currentVibe === genre.name ? 1 : 0,
        friction: 4,
        useNativeDriver: true,
      }).start();
    });
  }, [currentVibe]);

  return (
    <S.Container>
      <S.MainBackground colors={['#000', '#0a0a0f', '#ed145b15']} />
      <S.BackButtonContainer>
        <TouchableWithoutFeedback onPress={onBack}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <S.BackButtonCircle><Ionicons name="chevron-back" size={28} color="#ed145b" /></S.BackButtonCircle>
            <S.BackText>Sair do Andar {floor}</S.BackText>
          </View>
        </TouchableWithoutFeedback>
      </S.BackButtonContainer>
      <S.ScrollArea>
        <S.HeaderSection>
          <S.TitleMain>Andar <S.TitleAccent>{floor}º</S.TitleAccent></S.TitleMain>
          <S.Subtitle>Selecione um gênero para ver as músicas.</S.Subtitle>
        </S.HeaderSection>
        <S.GenreGrid>
          {genres.map((item) => (
            <AnimatedCard key={item.id} onPress={() => onSelectVibe(item.name)} style={{ transform: [{ scale: scaleAnims[item.name].interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) }], borderColor: currentVibe === item.name ? '#ed145b' : 'transparent' }}>
              <S.GenreImage source={item.img} />
              <S.CardOverlay colors={['transparent', 'rgba(0,0,0,0.8)']}>
                <S.GenreTitle>{item.name.toUpperCase()}</S.GenreTitle>
              </S.CardOverlay>
            </AnimatedCard>
          ))}
        </S.GenreGrid>
      </S.ScrollArea>
    </S.Container>
  );
}