import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Page', () => {
  it('should render welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/welcome to ticket manager/i)).toBeInTheDocument();
  });

  it('should have a CTA button or link', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });
});
