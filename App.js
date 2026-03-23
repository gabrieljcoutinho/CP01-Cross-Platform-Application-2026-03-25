import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen'; // Nova Importação
import RoomSelectionScreen from './pages/SelecionandoAsala';
import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(4000); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Estado para salvar o usuário cadastrado (Simulando um banco de dados)
  const [registeredUser, setRegisteredUser] = useState(null);

  // Função para salvar cadastro
  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false); // Volta para o login após cadastrar
  };

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  // Se o usuário está na tela de Cadastro
  if (isRegistering) {
    return (
      <>
        <RegistrationScreen 
          onRegister={handleUserRegistration} 
          onBack={() => setIsRegistering(false)} 
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Se não está logado, mostra Login
  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen 
          onLogin={() => setIsLoggedIn(true)} 
          onGoToRegister={() => setIsRegistering(true)}
          registeredUser={registeredUser}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Se logado, mostra seleção de sala
  return (
    <>
      <RoomSelectionScreen />
      <StatusBar style="light" />
    </>
  );
}








/*import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from './components/LoadingScreen';
import RoomSelectionScreen from './pages/SelecionandoAsala';
import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(5000);

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <>
      <RoomSelectionScreen />
      <StatusBar style="light" />
    </>
  );
}*/