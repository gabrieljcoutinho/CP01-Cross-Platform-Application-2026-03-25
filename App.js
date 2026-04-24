import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/CadastroScreen';
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

  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
  };

  const handleMusicAdded = () => {
    setSelectedGenre(null);
    setShowNowPlaying(true);
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

  if (selectedGenre) {
    return (
      <MusicListScreen
        genre={selectedGenre}
        floor={selectedFloor}
        onMusicAdded={handleMusicAdded}
        onBack={() => setSelectedGenre(null)}
      />
    );
  }

  if (showNowPlaying && selectedFloor) {
    return (
      <TocandoAgora
        floor={selectedFloor}
        onAddMusic={() => setShowNowPlaying(false)}
        onBack={() => {
          setShowNowPlaying(false);
          setSelectedFloor(null);
        }}
      />
    );
  }

  if (selectedFloor) {
    return (
      <VibeSelectionScreen
        floor={selectedFloor}
        onSelectVibe={(genre) => setSelectedGenre(genre)}
        onBack={() => setShowNowPlaying(true)}
      />
    );
  }

  return (
    <>
      <RoomSelectionScreen
        onSelectFloor={(floor) => {
          setSelectedFloor(floor);
          setShowNowPlaying(true);
        }}
      />
      <StatusBar style="light" />
    </>
  );
}