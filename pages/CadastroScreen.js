import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as S from '../Css/styleCadastro';

export default function CadastroScreen({ onRegister, onBack }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // 🔥 CHAMA REGISTRO
    onRegister(user, password);

    // 🔥 ALERT DEPOIS (evita travar render)
    setTimeout(() => {
      Alert.alert("Sucesso", "Conta criada com sucesso! Faça login.");
    }, 100);
  };

  return (
    <S.Container>
      <S.MainBackground
        colors={['#000000', '#08080c', '#ed145b15']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <S.ContentWrapper behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <S.HeaderSection>
          <S.Subtitle>New Account</S.Subtitle>
          <S.Title>CADASTRO</S.Title>
        </S.HeaderSection>

        <S.InputContainer>
          <S.Label>Escolha seu Usuário</S.Label>
          <S.StyledInput
            placeholder="Ex: novo_aluno"
            value={user}
            onChangeText={setUser}
            autoCapitalize="none"
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label>Escolha sua Senha</S.Label>
          <S.StyledInput
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </S.InputContainer>

        <S.ActionButton activeOpacity={0.8} onPress={handleRegister}>
          <S.ButtonText>Finalizar Cadastro</S.ButtonText>
        </S.ActionButton>

        <S.FooterLink onPress={onBack}>
          <S.FooterText>Já tem uma conta? Voltar ao Login</S.FooterText>
        </S.FooterLink>
      </S.ContentWrapper>
    </S.Container>
  );
}