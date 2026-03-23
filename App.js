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

  // Alterado: Agora apenas salva a vibe no estado, sem fechar a tela
  const handleVibeSelection = (vibeName) => {
    setFloorStates((prev) => ({
      ...prev,
      [selectedFloor]: vibeName,
    }));
    // Removido o setSelectedFloor(null) daqui
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

  if (selectedFloor) {
    return (
      <>
        <VibeSelectionScreen
          floor={selectedFloor}
          onBack={handleBackToFloors} // Agora o usuário só volta quando clicar no botão de voltar
          onSelectVibe={handleVibeSelection}
          currentVibe={floorStates[selectedFloor]}
        />
        <StatusBar style="light" />
      </>
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