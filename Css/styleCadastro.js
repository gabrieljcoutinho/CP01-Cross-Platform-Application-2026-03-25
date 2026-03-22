import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as S from '../Css/styleLogin';

export default function RegisterScreen({ onBackToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Erro de Validação", "Todos os parâmetros do protocolo devem ser preenchidos.");
      return;
    }
    Alert.alert("Sucesso", "Credenciais registradas na base de dados.");
    onBackToLogin();
  };

  return (
    <S.Container>
      <S.MainBackground
        colors={['#000000', '#08080c', '#14eddf15']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <S.ContentWrapper behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <S.HeaderSection>
          <S.LoginSubtitle>New Credentials</S.LoginSubtitle>
          <S.LoginTitle>CADASTRO</S.LoginTitle>
        </S.HeaderSection>

        <S.InputContainer>
          <S.Label>Full_Name</S.Label>
          <S.StyledInput
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label>Email_Address</S.Label>
          <S.StyledInput
            placeholder="exemplo@fiap.com.br"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label>Security_Key</S.Label>
          <S.StyledInput
            placeholder="Crie uma senha forte"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </S.InputContainer>

        <S.LoginButton activeOpacity={0.8} onPress={handleRegister}>
          <S.ButtonText>Finalizar Registro</S.ButtonText>
        </S.LoginButton>

        <S.FooterLink onPress={onBackToLogin}>
          <S.FooterText>Já possui conta? Voltar ao Login</S.FooterText>
        </S.FooterLink>
      </S.ContentWrapper>
    </S.Container>
  );
}