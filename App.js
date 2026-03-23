import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// Componentes e Telas
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import RoomSelectionScreen from './pages/SelecionandoAsala';
import VibeSelectionScreen from './pages/VibeSelectionScreen'; // A nova tela que criamos

// Hook de carregamento
import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  // 1. Estado de Carregamento Inicial (Splash)
  const isLoaded = useAppLoader(4000); 

  // 2. Estados de Autenticação
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // 3. Estado de Navegação Interna (Pós-Login)
  const [selectedFloor, setSelectedFloor] = useState(null);

  // --- FUNÇÕES DE LÓGICA ---

  // Salva o usuário e volta para o Login
  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
  };

  // Logout ou Voltar do Vibe para os Andares
  const handleBackToFloors = () => {
    setSelectedFloor(null);
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // Passo 1: Tela de Loading (Splash)
  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  // Passo 2: Fluxo de Cadastro
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

  // Passo 3: Fluxo de Login
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

  // Passo 4: Se logado e um andar foi selecionado -> Tela de Vibe (Gêneros)
  if (selectedFloor) {
    return (
      <>
        <VibeSelectionScreen 
          floor={selectedFloor} 
          onBack={handleBackToFloors} 
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Passo 5: Se logado mas nenhum andar selecionado -> Tela de Seleção de Sala
  return (
    <>
      <RoomSelectionScreen onSelectFloor={(floor) => setSelectedFloor(floor)} />
      <StatusBar style="light" />
    </>
  );
}













/*import React, { useState } from 'react';
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
}*/








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

