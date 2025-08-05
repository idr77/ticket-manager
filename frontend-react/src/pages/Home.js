// Page d'accueil avec formulaire de connexion et inscription
import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Home() {
  return (
    <div>
      <h1>Welcome to Ticket Manager</h1>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default Home;