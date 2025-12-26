import React from 'react';
import { render, screen } from '@testing-library/react';
import TicketList from './TicketList';

describe('TicketList Component', () => {
  it('should render ticket list', () => {
    // Basic test to ensure it renders without crashing
    render(<TicketList />);
    expect(screen.getByText(/tickets/i)).toBeInTheDocument();
  });
});
