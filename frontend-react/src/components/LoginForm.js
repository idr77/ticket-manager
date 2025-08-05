// Formulaire de connexion utilisateur
import React, { useState } from 'react';
import api from '../services/api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/dashboard';
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;