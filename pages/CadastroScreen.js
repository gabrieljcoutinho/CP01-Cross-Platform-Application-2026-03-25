import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from '../Css/styleCadastro';

export default function CadastroScreen({ onBack }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      // 🔥 pega usuários existentes
      const storedUsers = await AsyncStorage.getItem('users');
      const usuarios = storedUsers ? JSON.parse(storedUsers) : [];

      // 🔥 verifica se usuário já existe
      const existe = usuarios.find(u => u.user === user.trim());

      if (existe) {
        Alert.alert("Erro", "Usuário já existe.");
        return;
      }

      // 🔥 cria novo usuário
      const novoUsuario = {
        user: user.trim(),
        password: password.trim()
      };

      const novosUsuarios = [...usuarios, novoUsuario];

      // 🔥 salva
      await AsyncStorage.setItem('users', JSON.stringify(novosUsuarios));

      Alert.alert("Sucesso", "Conta criada! Faça login.");

      // 🔥 volta pro login
      onBack();

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar cadastro.");
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