import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import RoomSelectionScreen from './pages/SelecionandoAsala';
import VibeSelectionScreen from './pages/VibeSelectionScreen';
import MusicListScreen from './pages/MusicListScreen';
import TocandoAgora from './pages/TocandoAgora';

import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(4000);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const [floorStates, setFloorStates] = useState({});
  const [selectedFloor, setSelectedFloor] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState(null);

  // 🔥 NOVO STATE
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
  };

  // 🔥 Quando escolhe vibe → vai pra lista
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

  // 🔥 TELA NOVA (ANTES DE TUDO)
  if (showNowPlaying && selectedFloor) {
    return (
      <TocandoAgora
        floor={selectedFloor}
        onContinue={() => setShowNowPlaying(false)}
        onBack={() => {
          setShowNowPlaying(false);
          setSelectedFloor(null);
        }}
      />
    );
  }

  // 🔥 LISTA DE MÚSICAS
  if (selectedGenre) {
    return (
      <MusicListScreen
        genre={selectedGenre}
        onBack={() => setSelectedGenre(null)}
      />
    );
  }

  // 🔥 ESCOLHA DE VIBE
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

  // 🔥 TELA INICIAL (ANDARES)
  return (
    <>
      <RoomSelectionScreen
        onSelectFloor={(floor) => {
          setSelectedFloor(floor);
          setShowNowPlaying(true); // 🔥 abre TocandoAgora primeiro
        }}
        floorStates={floorStates}
      />
      <StatusBar style="light" />
    </>
  );
}