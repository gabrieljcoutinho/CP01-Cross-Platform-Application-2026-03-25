import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import RoomSelectionScreen from './pages/SelecionandoAsala';
import VibeSelectionScreen from './pages/VibeSelectionScreen';
import MusicListScreen from './pages/MusicListScreen';

import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(4000);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const [floorStates, setFloorStates] = useState({});
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isViewingSongs, setIsViewingSongs] = useState(false);

  // Css da responsividade desse componente
  // Garante que o usuário volte ao login após o cadastro
  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
  };

  const handleVibeSelection = (vibeName) => {
    setFloorStates((prev) => ({
      ...prev,
      [selectedFloor]: vibeName,
    }));
    setIsViewingSongs(true);
  };

  const handleBackToGenres = () => {
    setIsViewingSongs(false);
  };

  if (!isLoaded) return <LoadingScreen />;

  // PRIORIDADE 1: Se estiver cadastrando, mostra a tela de cadastro
  if (isRegistering) {
    return (
      <RegistrationScreen
        onRegister={handleUserRegistration}
        onBack={() => setIsRegistering(false)}
      />
    );
  }

  // PRIORIDADE 2: Se não estiver logado, mostra o Login
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        onGoToRegister={() => setIsRegistering(true)}
        registeredUser={registeredUser}
      />
    );
  }

  // TELA 3: Lista de Músicas (Aberto após escolher o gênero)
  if (selectedFloor && isViewingSongs) {
    return (
      <MusicListScreen
        floor={selectedFloor}
        genre={floorStates[selectedFloor]}
        onBack={handleBackToGenres}
      />
    );
  }

  // TELA 2: Seleção de Gênero (Aberto após escolher o andar)
  if (selectedFloor) {
    return (
      <VibeSelectionScreen
        floor={selectedFloor}
        onBack={() => setSelectedFloor(null)}
        onSelectVibe={handleVibeSelection}
        currentVibe={floorStates[selectedFloor]}
      />
    );
  }

  // TELA 1: Seleção de Andar (Home do App)
  return (
    <>
      <RoomSelectionScreen
        onSelectFloor={(floor) => setSelectedFloor(floor)}
        floorStates={floorStates}
      />
      <StatusBar style="light" />
    </>
  );
}