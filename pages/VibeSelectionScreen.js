import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/styleVibeSelection';

const genres = [
  { id: '1', name: 'Rock', img: require('../imgs/Rock.png') },
  { id: '2', name: 'Eletrônico', img: require('../imgs/Eletronico.png') },
  { id: '3', name: 'Sertanejo', img: require('../imgs/Sertanejo.png') },
  { id: '4', name: 'Funk', img: require('../imgs/Funk.png') },
  { id: '5', name: 'Rap', img: require('../imgs/Rap.png') },
  { id: '6', name: 'Pagode', img: require('../imgs/Samba.png') },
];

export default function VibeSelectionScreen({ onSelectVibe, floor, onBack }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <S.Container>
      <S.MainBackground colors={['#000', '#0a0a0f', '#ed145b15']} />

      <S.BackButtonContainer>
        <TouchableWithoutFeedback onPress={onBack}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <S.BackButtonCircle>
              <Ionicons name="chevron-back" size={28} color="#ed145b" />
            </S.BackButtonCircle>
            <S.BackText>Voltar ao {floor}º Andar</S.BackText>
          </View>
        </TouchableWithoutFeedback>
      </S.BackButtonContainer>

      <S.ScrollArea>
        <Animated.View style={{ opacity: fadeAnim }}>
          <S.ContentWrapper>
            <S.HeaderSection>
              <S.TitleMain>Andar <S.TitleAccent>{floor}º</S.TitleAccent></S.TitleMain>
              <S.Subtitle>Qual a vibe de agora?</S.Subtitle>
            </S.HeaderSection>

            <S.GenreGrid>
              {genres.map((item) => (
                <S.GenreCard key={item.id} onPress={() => onSelectVibe(item.name)}>
                  <S.GenreImage source={item.img} />
                  <S.CardOverlay colors={['transparent', 'rgba(13, 13, 13, 0.9)']}>
                    <S.GenreTitle>{item.name.toUpperCase()}</S.GenreTitle>
                  </S.CardOverlay>
                </S.GenreCard>
              ))}
            </S.GenreGrid>
          </S.ContentWrapper>
        </Animated.View>
      </S.ScrollArea>
    </S.Container>
  );
}

// Css da responsividade desse componente
/* No styleVibeSelection.js, o GenreGrid deve usar flex-wrap: wrap e justify-content: space-around para se adaptar a tablets e celulares. */