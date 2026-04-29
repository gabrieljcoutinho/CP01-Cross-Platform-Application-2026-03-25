import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import { API_URL } from "../services/api";
import * as S from '../Css/styleLogin';

export default function LoginScreen({ onLogin, onGoToRegister }) {
  const [user, setUser]         = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleEnter = async () => {
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Acesso Negado", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Login realizado!");
        onLogin();
      } else {
        Alert.alert("Erro", data.error || "Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
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
            placeholder="Digite seu usuário"
            value={user}
            onChangeText={setUser}
            autoCapitalize="none"
            editable={!loading}
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label>Password_Key</S.Label>
          <S.StyledInput
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </S.InputContainer>

        <S.LoginButton activeOpacity={0.8} onPress={handleEnter} disabled={loading}>
          <S.ButtonText>{loading ? 'Entrando...' : 'Acessar Sistema'}</S.ButtonText>
        </S.LoginButton>

        <S.FooterLink onPress={onGoToRegister}>
          <S.FooterText>
            Não possui acesso?{" "}
            <S.FooterText style={{ color: '#ed145b', fontWeight: 'bold' }}>
              CADASTRE-SE
            </S.FooterText>
          </S.FooterText>
        </S.FooterLink>
      </S.ContentWrapper>
    </S.Container>
  );
}