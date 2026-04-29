import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import { API_URL } from "../services/api";
import * as S from '../Css/styleCadastro';

export default function CadastroScreen({ onBack }) {
  const [user, setUser]         = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleRegister = async () => {
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Conta criada! Faça login.");
        onBack();
      } else {
        Alert.alert("Erro", data.error || "Não foi possível criar a conta.");
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
            editable={!loading}
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label>Escolha sua Senha</S.Label>
          <S.StyledInput
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </S.InputContainer>

        <S.ActionButton activeOpacity={0.8} onPress={handleRegister} disabled={loading}>
          <S.ButtonText>{loading ? 'Criando conta...' : 'Finalizar Cadastro'}</S.ButtonText>
        </S.ActionButton>

        <S.FooterLink onPress={onBack}>
          <S.FooterText>Já tem uma conta? Voltar ao Login</S.FooterText>
        </S.FooterLink>
      </S.ContentWrapper>
    </S.Container>
  );
}