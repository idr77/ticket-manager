// Formulaire de connexion utilisateur
import React, { useState } from 'react';
import './Login.css';
import { login } from '../services/authService';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; // Vous pourriez utiliser React Router pour une meilleure expérience
    } catch (error) {
      console.error('Login failed:', error);
      // Idéalement, affichez une erreur dans l'UI
      alert('La connexion a échoué. Veuillez vérifier vos identifiants.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;