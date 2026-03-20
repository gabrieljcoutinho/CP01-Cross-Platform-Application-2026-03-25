import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, Easing } from 'react-native';
import * as S from '../Css/styleEscolhaDeSala';

const RoomButton = ({ title, index, status }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverValue = useRef(new Animated.Value(0)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrada em cascata
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      delay: index * 150,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    }).start();

    // Animação infinita de Scan
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(hoverValue, { toValue: 1, useNativeDriver: true, tension: 50 }).start();
  };

  const onPressOut = () => {
    Animated.spring(hoverValue, { toValue: 0, useNativeDriver: true }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const scanY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 140],
  });

  return (
    <Animated.View style={{ opacity: animatedValue, transform: [{ translateY }] }}>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <S.ButtonContainer>
          <S.GlowLayer style={{ opacity: hoverValue }} />
          <S.GlassCard>
            <S.ScanningLine style={{ transform: [{ translateY: scanY }] }} />
            <S.CardContent>
              <View>
                <S.RoomIndex>HUB_UNIT_0{index + 1}</S.RoomIndex>
                <S.RoomLabel>{title}</S.RoomLabel>
                <S.TechStatus>{status || 'OPERATIONAL'}</S.TechStatus>
              </View>
              <S.ActionCircle>
                <S.InnerCircle />
              </S.ActionCircle>
            </S.CardContent>
          </S.GlassCard>
        </S.ButtonContainer>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default function RoomSelectionScreen() {
  return (
    <S.Container>
      <S.MainBackground
        colors={['#000000', '#0a0a0f', '#ed145b20']} // Toque de vermelho FIAP no fundo
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <S.GridOverlay />

      <S.HeaderSection>
        <S.GlitchContainer>
          <S.TitleMain>FIAP MUSIC</S.TitleMain>
          <S.TitleSub>Paulista</S.TitleSub>
        </S.GlitchContainer>
        <S.StatusRow>
        </S.StatusRow>
      </S.HeaderSection>

      <S.ScrollArea showsVerticalScrollIndicator={false}>
        <S.MenuGrid>
          <RoomButton title="INNOVATION LAB" index={0} status="READY" />
          <RoomButton title="ROBOTICS HUB" index={1} status="ACTIVE" />
          <RoomButton title="CYBER SECURITY" index={2} status="SECURE" />
          <RoomButton title="MAKER SPACE" index={3} status="OPEN" />
          <RoomButton title="COGNITIVE HALL" index={4} status="READY" />
        </S.MenuGrid>
      </S.ScrollArea>
    </S.Container>
  );
}