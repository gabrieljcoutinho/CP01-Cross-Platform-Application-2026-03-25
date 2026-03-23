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

    // 🔥 força fluxo correto
    setIsRegistering(false);
    setIsLoggedIn(false);
  };

  const handleBackToFloors = () => {
    setSelectedFloor(null);
  };

  console.log("isRegistering:", isRegistering);
  console.log("isLoggedIn:", isLoggedIn);

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  // 🔥 PRIORIDADE TOTAL pro cadastro
  if (isRegistering === true) {
    return (
      <>
        <RegistrationScreen
          onRegister={handleUserRegistration}
          onBack={() => {
            console.log("voltando pro login");
            setIsRegistering(false);
          }}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // 🔥 só mostra login se NÃO estiver cadastrando
  if (isLoggedIn === false && isRegistering === false) {
    return (
      <>
        <LoginScreen
          onLogin={() => setIsLoggedIn(true)}
          onGoToRegister={() => {
            console.log("indo pra cadastro");
            setIsRegistering(true);
          }}
          registeredUser={registeredUser}
        />
        <StatusBar style="light" />
      </>
    );
  }

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

  return (
    <>
      <RoomSelectionScreen onSelectFloor={(floor) => setSelectedFloor(floor)} />
      <StatusBar style="light" />
    </>
  );
}