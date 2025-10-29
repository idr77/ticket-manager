import api from './api';

// Define a type for the ticket object for better type safety
interface Ticket {
  id?: number;
  title: string;
  description: string;
  status: string;
}

export const getAllTickets = async () => {
  const response = await api.get('/tickets');
  return response.data;
};

export const createTicket = async (ticket: Omit<Ticket, 'id'>) => {
  const response = await api.post('/tickets', ticket);
  return response.data;
};

export const updateTicket = async (id: number, ticket: Partial<Ticket>) => {
  const response = await api.put(`/tickets/${id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id: number) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};
