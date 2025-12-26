/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './RegisterForm';
import * as authService from '../services/authService';

jest.mock('../services/authService');

describe('Register Component', () => {
  it('should call register API on form submit', () => {
    const registerMock = jest.fn().mockResolvedValue({ token: 'fake-token' });
    jest.spyOn(authService, 'register').mockImplementation(registerMock);

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(registerMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
