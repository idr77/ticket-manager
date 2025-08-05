import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import * as ticketService from '../services/ticketService';

jest.mock('../services/ticketService');

describe('Dashboard Page', () => {
  it('should display ticket statistics', async () => {
    (ticketService.getTickets as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Fix bug', status: 'OPEN' },
      { id: 2, title: 'UI update', status: 'CLOSED' },
    ]);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/open tickets/i)).toBeInTheDocument();
      expect(screen.getByText(/closed tickets/i)).toBeInTheDocument();
    });
  });
});
