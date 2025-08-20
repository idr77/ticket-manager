import api from './api';

export const login = async (credentials: { email: string; password: string }) => {
  // Axios gère automatiquement les erreurs pour les réponses non-2xx
  // et retourne les données directement dans `response.data`
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (user: { email: string; password: string }) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};
