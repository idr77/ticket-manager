// Page d'accueil avec formulaire de connexion et inscription
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <div className="page-header">
        <h1>{showLogin ? 'Login' : 'Register'}</h1>
      </div>
      {showLogin ? (
        <>
          <LoginForm />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setShowLogin(false)}>Register</button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm />
          <p>
            Already have an account?{' '}
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default Home;