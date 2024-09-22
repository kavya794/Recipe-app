import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Auth.css'; // Assuming both Login and Signup will use the same styles
import { useNavigate } from 'react-router-dom';
function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      navigate('/');
      console.log("User logged in");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
