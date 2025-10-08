import api from './api';

/**
 * Attempts to log in a user with their credentials.
 * @param {object} credentials - The user's credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<object>} A promise that resolves with the user data, including the JWT token.
 * @throws {Error} Throws an error if the login fails (handled by Axios for non-2xx responses).
 */
export const login = async (credentials: { email: string; password: string }) => {
  // Axios automatically handles errors for non-2xx responses
  // and returns the data directly in `response.data`
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

/**
 * Registers a new user.
 * @param {object} user - The user information to register.
 * @param {string} user.email - The user's email address.
 * @param {string} user.password - The user's password.
 * @returns {Promise<object>} A promise that resolves with the registered user's data.
 * @throws {Error} Throws an error if registration fails.
 */
export const register = async (user: { email: string; password: string }) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};
