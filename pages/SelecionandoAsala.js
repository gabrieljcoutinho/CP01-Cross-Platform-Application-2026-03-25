import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import * as S from '../Css/styleEscolhaDeSala';

const RoomButton = ({ title, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()}
      >
        <S.ButtonWrapper>
          <S.RoomGradient>
            <S.RoomLabel>{title}</S.RoomLabel>
            <S.StatusGlow />
          </S.RoomGradient>
        </S.ButtonWrapper>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function RoomSelectionScreen() {
  return (
    <S.Container>
      <S.BackgroundGradient />

      <S.Header>
        <S.TitleText>ESCOLHA SUA</S.TitleText>
        <S.SubtitleText>SALA</S.SubtitleText>
        <S.NeonDivider />
      </S.Header>

      <S.MenuContainer>
        <RoomButton title="SALA DE ESTAR" index={0} />
        <RoomButton title="COZINHA GOURMET" index={1} />
        <RoomButton title="QUARTO MASTER" index={2} />
        <RoomButton title="ÁREA EXTERNA" index={3} />
      </S.MenuContainer>
    </S.Container>
  );
}