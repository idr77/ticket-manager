// Formulaire d'inscription utilisateur
import React, { useState } from 'react';
import './Register.css';
import { register } from '../services/authService';

function RegisterForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register({ email, password });
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      // Optionnel : rediriger vers la page de connexion
    } catch (error) {
      console.error('Registration failed:', error);
      alert("L'inscription a échoué. Veuillez réessayer.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;