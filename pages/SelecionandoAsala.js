import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import * as S from '../Css/styleEscolhaDeSala';

const FloorButton = ({ level, sectors, index }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(hoverValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(hoverValue, { toValue: 0, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ opacity: animatedValue, transform: [{ scale: animatedValue }] }}>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <S.ButtonContainer>
          <S.GlowLayer style={{ opacity: hoverValue }} />
          <S.GlassCard>
            <S.CardContent>
              <S.LevelIndicator>
                <S.LevelNumber>{level}</S.LevelNumber>
                <S.LevelUnit>ANDAR</S.LevelUnit>
              </S.LevelIndicator>

              <S.InfoArea>
                <S.RoomIndex>Unidade Paulista</S.RoomIndex>
                <S.RoomLabel>Andar {level}º</S.RoomLabel>
                <S.TechStatus>{sectors}</S.TechStatus>
              </S.InfoArea>

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
        colors={['#000000', '#08080c', '#ed145b10']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <S.HeaderSection>
        <S.GlitchContainer>
          <S.TitleMain>SELECT LEVEL</S.TitleMain>
          <S.TitleSub>PAULISTA</S.TitleSub>
        </S.GlitchContainer>
        <S.StatusRow>
          <S.StatusPulse />
          <S.SystemText>SISTEMA DE ACESSO POR ANDAR</S.SystemText>
        </S.StatusRow>
      </S.HeaderSection>

      <S.ScrollArea showsVerticalScrollIndicator={false}>
        <S.MenuGrid>
          <FloorButton level={1} index={0} sectors="ADM / CO-WORKING / TECH" />
          <FloorButton level={2} index={1} sectors="CYBERSECURITY / DEV / IA" />
          <FloorButton level={3} index={2} sectors="ROBOTICS / ENGINEERING" />
          <FloorButton level={4} index={3} sectors="GAME DEV / DESIGN HUB" />
          <FloorButton level={5} index={4} sectors="MASTER LAB / POST-GRAD" />
        </S.MenuGrid>
      </S.ScrollArea>
    </S.Container>
  );
}