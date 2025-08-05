const API_URL = 'http://localhost:8080/api/tickets';

export const getTickets = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch tickets');
  return await response.json();
};
