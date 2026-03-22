import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as S from '../Css/styleLogin';

export default function LoginScreen({ onLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleEnter = () => {
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Acesso Negado", "Preencha todos os campos do sistema.");
      return;
    }
    // Aqui você pode adicionar lógica de autenticação real
    onLogin();
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
          <S.LoginSubtitle>System Access</S.LoginSubtitle>
          <S.LoginTitle>LOGIN</S.LoginTitle>
        </S.HeaderSection>

        <S.InputContainer>
          <S.Label>Usuário_ID</S.Label>
          <S.StyledInput
            placeholder="Ex: admin_fiap"
            value={user}
            onChangeText={setUser}
            autoCapitalize="none"
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label>Password_Key</S.Label>
          <S.StyledInput
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </S.InputContainer>

        <S.LoginButton activeOpacity={0.8} onPress={handleEnter}>
          <S.ButtonText>Acessar Sistema</S.ButtonText>
        </S.LoginButton>

        <S.FooterLink>
          <S.FooterText>Esqueceu as credenciais de acesso?</S.FooterText>
        </S.FooterLink>
      </S.ContentWrapper>
    </S.Container>
  );
}