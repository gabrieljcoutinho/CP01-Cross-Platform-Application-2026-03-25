import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as S from '../Css/styleLogin'; // Mantendo o seu estilo externo

export default function LoginScreen({ onLogin, onGoToRegister, registeredUser }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleEnter = () => {
    // 1. Verifica se os campos estão vazios
    if (user.trim() === '' || password.trim() === '') {
      Alert.alert("Acesso Negado", "Preencha todos os campos do sistema.");
      return;
    }

    // 2. Verifica se existe um usuário cadastrado no "sistema" (estado do App.js)
    if (!registeredUser) {
      Alert.alert(
        "Usuário não encontrado", 
        "Nenhum registro detectado. Por favor, crie uma conta primeiro."
      );
      return;
    }

    // 3. Compara os dados digitados com os dados salvos no cadastro
    if (user === registeredUser.user && password === registeredUser.password) {
      onLogin(); // Sucesso: Vai para a tela de Escolha de Sala
    } else {
      Alert.alert("Erro de Autenticação", "Usuário_ID ou Password_Key incorretos.");
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

        {/* Link para a tela de Cadastro */}
        <S.FooterLink onPress={onGoToRegister}>
          <S.FooterText>
            Não possui acesso? <S.FooterText style={{color: '#ed145b', fontWeight: 'bold'}}>CADASTRE-SE</S.FooterText>
          </S.FooterText>
        </S.FooterLink>
      </S.ContentWrapper>
    </S.Container>
  );
}