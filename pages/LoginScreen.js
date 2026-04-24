import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as S from '../Css/styleLogin';

const ARQUIVO = FileSystem.documentDirectory + 'usuarios.json';

export default function LoginScreen({ onLogin, onGoToRegister }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleEnter = async () => {
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Acesso Negado", "Preencha todos os campos do sistema.");
      return;
    }

    try {
      const fileInfo = await FileSystem.getInfoAsync(ARQUIVO);

      if (!fileInfo.exists) {
        Alert.alert("Usuário não encontrado", "Nenhum registro detectado. Por favor, crie uma conta primeiro.");
        return;
      }

      const conteudo = await FileSystem.readAsStringAsync(ARQUIVO);
      const usuarios = JSON.parse(conteudo);

      const encontrado = usuarios.find(
        u => u.email === user.trim() && u.senha === password.trim()
      );

      if (encontrado) {
        console.log("LOGIN OK");
        onLogin();
      } else {
        Alert.alert("Erro de Autenticação", "Usuário_ID ou Password_Key incorretos.");
      }

    } catch (error) {
      Alert.alert("Erro", "Não foi possível verificar o login.");
      console.error(error);
    }
  };

  const handleGoToRegister = () => {
    console.log("CLICOU CADASTRAR");
    onGoToRegister();
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

        <S.FooterLink onPress={handleGoToRegister}>
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