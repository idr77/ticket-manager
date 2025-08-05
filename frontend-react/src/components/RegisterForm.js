// Formulaire d'inscription utilisateur
import React, { useState } from 'react';
import api from '../services/api';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', { email, password });
    alert('Registration successful');
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Register</h3>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;