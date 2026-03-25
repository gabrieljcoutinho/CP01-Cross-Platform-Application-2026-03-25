import Constants from "expo-constants";

// pega o IP do Expo (dev)
const localIP = Constants.expoConfig?.hostUri?.split(":")[0];

// URL base da API
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  `http://${localIP}:5000`;
