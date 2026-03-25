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
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
  };

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

  // 1. TELA DE MÚSICAS DO GÊNERO (Nível mais profundo)
  if (selectedGenre) {
    return (
      <MusicListScreen
        genre={selectedGenre}
        onBack={() => setSelectedGenre(null)}
      />
    );
  }

  // 2. TELA TOCANDO AGORA (Sobrepõe a seleção de vibe)
  if (showNowPlaying && selectedFloor) {
    return (
      <TocandoAgora
        floor={selectedFloor}
        onContinue={() => setShowNowPlaying(false)}
        onAddMusic={() => setShowNowPlaying(false)} // Redireciona para VibeSelection
        onBack={() => {
          setShowNowPlaying(false);
          setSelectedFloor(null);
        }}
      />
    );
  }

  // 3. TELA DE SELEÇÃO DE VIBE (Aparece quando showNowPlaying é false)
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

  // 4. TELA INICIAL (ANDARES)
  return (
    <>
      <RoomSelectionScreen
        onSelectFloor={(floor) => {
          setSelectedFloor(floor);
          setShowNowPlaying(true);
        }}
        floorStates={floorStates}
      />
      <StatusBar style="light" />
    </>
  );
}