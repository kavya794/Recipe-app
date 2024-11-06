// src/components/SignUp.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      navigate('/'); 
      alert("User signed up successfully");
    } catch (error) {
      console.error("Signup error: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error if any */}
    </div>
  );
}

export default Signup;
