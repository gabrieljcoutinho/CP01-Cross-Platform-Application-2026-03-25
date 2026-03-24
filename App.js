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

  // 🔥 NOVO STATE
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
  };

  // 🔥 ALTERADO → agora abre lista de músicas
  const handleVibeSelection = (vibeName) => {
    setSelectedGenre(vibeName);
  };

  if (!isLoaded) return <LoadingScreen />;

  if (isRegistering) {
    return (
      <RegistrationScreen
        onRegister={handleUserRegistration}
        onBack={() => setIsRegistering(false)}
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        onGoToRegister={() => setIsRegistering(true)}
        registeredUser={registeredUser}
      />
    );
  }

  // 🔥 NOVA TELA (ANTES DE TUDO)
  if (selectedGenre) {
    return (
      <MusicListScreen
        genre={selectedGenre}
        onBack={() => setSelectedGenre(null)}
      />
    );
  }

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