import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import * as S from '../Css/styleEscolhaDeSala';

const RoomButton = ({ title, index }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(hoverValue, { toValue: 1, useNativeDriver: true, bounciness: 20 }).start();
  };

  const onPressOut = () => {
    Animated.spring(hoverValue, { toValue: 0, useNativeDriver: true }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const scale = hoverValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const glowOpacity = hoverValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View style={{ opacity: animatedValue, transform: [{ translateY }, { scale }] }}>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <S.ButtonContainer>
          <S.GlowLayer style={{ opacity: glowOpacity }} />
          <S.GlassCard>
            <S.CardContent>
              <View>
                <S.RoomIndex>0{index + 1}</S.RoomIndex>
                <S.RoomLabel>{title}</S.RoomLabel>
              </View>
              <S.ActionCircle>
                <S.InnerCircle />
              </S.ActionCircle>
            </S.CardContent>
            <S.ScanningLine />
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
        colors={['#020b1a', '#051937', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <S.GridOverlay />

      <S.HeaderSection>
        <S.GlitchContainer>
          <S.TitleMain>CONTROL</S.TitleMain>
          <S.TitleSub>CENTER</S.TitleSub>
        </S.GlitchContainer>
        <S.StatusRow>
          <S.StatusPulse />
          <S.SystemText>SYSTEM ACTIVE OVERRIDE</S.SystemText>
        </S.StatusRow>
      </S.HeaderSection>

      <S.ScrollArea showsVerticalScrollIndicator={false}>
        <S.MenuGrid>
          <RoomButton title="LIVING AREA" index={0} />
          <RoomButton title="GOURMET LAB" index={1} />
          <RoomButton title="MASTER SUITE" index={2} />
          <RoomButton title="EXTERNAL HUB" index={3} />
        </S.MenuGrid>
      </S.ScrollArea>
    </S.Container>
  );
}