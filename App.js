import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import RoomSelectionScreen from './pages/SelecionandoAsala';
import VibeSelectionScreen from './pages/VibeSelectionScreen';

import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(4000);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Estado que isola as vibes por andar: { 1: 'Rock', 2: 'Samba' }
  const [floorStates, setFloorStates] = useState({});
  const [selectedFloor, setSelectedFloor] = useState(null);

  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
    setIsLoggedIn(false);
  };

  const handleBackToFloors = () => {
    setSelectedFloor(null);
  };

  // Função crucial: Salva a vibe apenas na chave do andar selecionado
  const handleVibeSelection = (vibeName) => {
    setFloorStates((prev) => ({
      ...prev,
      [selectedFloor]: vibeName,
    }));
    setSelectedFloor(null); // Retorna à lista de andares após escolher
  };

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

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

  // Renderização da Tela de Vibes com isolamento de dados
  if (selectedFloor) {
    return (
      <>
        <VibeSelectionScreen
          floor={selectedFloor}
          onBack={handleBackToFloors}
          onSelectVibe={handleVibeSelection}
          currentVibe={floorStates[selectedFloor]} // Passa a vibe atual do andar (se houver)
        />
        <StatusBar style="light" />
      </>
    );
  }

  // Tela de Seleção de Andar com feedback visual das escolhas feitas
  return (
    <>
      <RoomSelectionScreen
        onSelectFloor={(floor) => setSelectedFloor(floor)}
        floorStates={floorStates} // Passa o objeto completo para mostrar o status nos botões
      />
      <StatusBar style="light" />
    </>
  );
}