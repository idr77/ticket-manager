import api from './api';

export const getTickets = async () => {
  // L'instance `api` ajoute automatiquement le header `Authorization`.
  const response = await api.get('/tickets');
  return response.data;
};
