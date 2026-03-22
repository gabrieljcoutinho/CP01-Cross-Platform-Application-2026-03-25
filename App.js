import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/Cadastro';
import RoomSelectionScreen from './pages/SelecionandoAsala';
import { useAppLoader } from './hook/useAppLoader';

export default function App() {
  const isLoaded = useAppLoader(4000);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' ou 'register'

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
        <StatusBar style="light" />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        {currentScreen === 'login' ? (
          <LoginScreen
            onLogin={() => setIsLoggedIn(true)}
            onGoToRegister={() => setCurrentScreen('register')}
          />
        ) : (
          <RegisterScreen
            onBackToLogin={() => setCurrentScreen('login')}
          />
        )}
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
}