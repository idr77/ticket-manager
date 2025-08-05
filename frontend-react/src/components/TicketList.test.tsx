/// <reference types="jest" />
import React from 'react';
import { jest, describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import TicketList from './TicketList';
import * as ticketService from '../services/ticketService';

jest.mock('../services/ticketService');

describe('TicketList Component', () => {
  it('should fetch and display tickets', async () => {
    (ticketService.getTickets as any).mockResolvedValue([
      { id: 1, title: 'Fix bug', status: 'OPEN' },
    ]);

    render(<TicketList />);

    await waitFor(() => {
      expect(screen.getByText('Fix bug')).toBeTruthy();
      
    });
  });
});
