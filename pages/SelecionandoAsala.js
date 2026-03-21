import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Easing, Dimensions } from 'react-native';
import * as S from '../Css/styleEscolhaDeSala';

const { width } = Dimensions.get('window');

const FloorButton = ({ level, index }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverValue = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      delay: index * 120,
      useNativeDriver: true,
      easing: Easing.bezier(0.2, 0, 0, 1),
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(hoverValue, { toValue: 1, useNativeDriver: true }),
      Animated.spring(pressScale, { toValue: 0.94, useNativeDriver: true })
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(hoverValue, { toValue: 0, useNativeDriver: true }),
      Animated.spring(pressScale, { toValue: 1, useNativeDriver: true })
    ]).start();
  };

  return (
    <Animated.View
      style={{
        opacity: animatedValue,
        transform: [
          { scale: pressScale },
          { translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 0]
            })
          }
        ]
      }}
    >
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <S.ButtonContainer>
          <S.GlowLayer style={{
            opacity: hoverValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.4]
            })
          }} />
          <S.GlassCard>
            <S.ScanLine style={{
              transform: [{
                translateX: hoverValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-width, 0]
                })
              }]
            }} />
            <S.CardContent>
              <S.InfoArea>
                <S.RoomIndex>Unidade Paulista</S.RoomIndex>
                <S.RoomLabel>Andar {level}º</S.RoomLabel>
              </S.InfoArea>
              {/* O bloco LevelDisplay (número grande e linha) foi removido daqui */}
            </S.CardContent>
          </S.GlassCard>
        </S.ButtonContainer>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default function RoomSelectionScreen() {
  const data = [1, 2, 3, 4, 5, 6, 7];

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

      <S.ScrollArea
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        indicatorStyle="white"
      >
        <S.MenuGrid>
          {data.map((level, index) => (
            <FloorButton
              key={level}
              level={level}
              index={index}
            />
          ))}
        </S.MenuGrid>
      </S.ScrollArea>
    </S.Container>
  );
}