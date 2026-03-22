import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen'; // Importando a nova tela
import RoomSelectionScreen from './pages/SelecionandoAsala';
import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(4000); // Reduzi para 4s para ficar mais fluido
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Enquanto carrega, mostra Splash/Loading
  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  //Após carregar, se não estiver logado, mostra Login
  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        <StatusBar style="light" />
      </>
    );
  }

  //Se estiver logado, mostra a seleção de sala
  return (
    <>
      <RoomSelectionScreen />
      <StatusBar style="light" />
    </>
  );
}









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