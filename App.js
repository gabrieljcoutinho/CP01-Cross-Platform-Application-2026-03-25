import React from 'react';
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
}