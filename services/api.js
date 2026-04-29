import Constants from "expo-constants";

const getApiUrl = () => {
  // 1. Se tiver variável de ambiente definida, usa ela (produção)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. No app nativo (Expo Go / build), pega o IP do Metro automaticamente
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(":")[0];
    return `http://${ip}:5000`;
  }

  // 3. Na web (expo start --web), o browser e o Flask rodam na mesma máquina
  return "http://localhost:5000";
};

export const API_URL = getApiUrl();