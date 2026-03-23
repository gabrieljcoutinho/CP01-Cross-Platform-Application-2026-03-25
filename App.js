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
  const [selectedFloor, setSelectedFloor] = useState(null);

  const handleUserRegistration = (user, password) => {
    setRegisteredUser({ user, password });
    setIsRegistering(false);
    setIsLoggedIn(false);
  };

  const handleBackToFloors = () => {
    setSelectedFloor(null);
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

  // Se um andar foi selecionado, mostra a Vibe
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

  // Tela principal após login: Seleção de Andar
  return (
    <>
      <RoomSelectionScreen onSelectFloor={(floor) => setSelectedFloor(floor)} />
      <StatusBar style="light" />
    </>
  );
}