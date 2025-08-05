/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './LoginForm';
import * as authService from '../services/authService';

jest.mock('../services/authService');

describe('Login Component', () => {
  it('should call login API on form submit', () => {
    const loginMock = jest.fn().mockResolvedValue({ token: 'mock-token' });
    (authService.login as jest.Mock) = loginMock;

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(loginMock).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: '123456',
    });
  });
});
