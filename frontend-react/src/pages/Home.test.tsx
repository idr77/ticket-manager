import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Page', () => {
  it('should render auth forms', () => {
    render(<Home />);
    expect(screen.getAllByRole('heading', { name: /login/i })[0]).toBeInTheDocument();
  });

  it('should switch between login and register', () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getAllByRole('heading', { name: /register/i })[0]).toBeInTheDocument();
  });
});
